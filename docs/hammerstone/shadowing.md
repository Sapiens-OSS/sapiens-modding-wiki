# Shadowing with Hammerstone

:::info
This page builds upon the explanation inside of the base-game [shadowing explanation](/guide/shadowing).
:::

'Shadowing' is what allows us to hook our logic into sapiens. This page introduces something called the 'shadowing utility' which makes this job easier, by introducing a 
simpler syntax.

### Normal Shadowing

In the base game, shadowing is implemented by calling a special function called `onload`, with a single param, representing the 
original base game module. This module can be used to 'hook' or override functions, change local state, etc.

:::details 'Normal Shadowing' example, for reference.
Here is an example, which shows:
 - Injecting a variable (greet)
 - Shadowing a function (setMapMode)
 - Injecting a new function (newFunction)
 
```lua
local mod = {loadOrder = 1}

-- Define a new function.
local function newFunction()
	mj:log("New Function")
end

function mod:onload(localPlayer)              -- localPlayer variable refers to the 
	localPlayer.greet = "Hello World"         -- Define a new 'greet' variable on the module

	mj:log("Onload Called")

	super_setMapMode = localPlayer.setMapMode -- Save the original 'setMapMode' function to a local var (the "super"), so we can re-call it layer
	localPlayer.setMapMode = function(self, newMapModeOrNil, shouldSnap)
		mj:log("Before setMapMode")
		super_setMapMode(newMapModeOrNil, shouldSnap) -- Call the super, so that the base game logic continues to be called.
		mj:log("After setMapMode")
	end

	localPlayer.newFunction = newFunction -- Remap the local 'newFunction' so that it's available on the `localPlayer` module.

end
return mod
```

As you can see, once you have access to the `localPlayer` module you have a *lot of freedom* to update and change it's behavior -it's just a bit finicky.
:::

### Shadowing Utility

While the 'onload' based syntax from above is very powerful, it can be a bit annoying to write. A 'shadow' file tends to look very different than a base game file
which can make it harder to read and understand.

Hammerstone solves this with something called the *shadowing utility* which you can import like so:
 - `mjrequire "hammerstone/utils/shadow"`

Once you've imported this module, you have access to the `shadow:shadow` function, which takes in a lua module, and re-configures it as a valid shadow. This is a *transformation* step, and allows you to author a normal lua file, without defining `onload`. 

Here is the same example from above, rewritten using this utility:

```lua
-- Include the shadowing utility
mjrequire "hammerstone/utils/shadow"

-- Start by defining a module matching the name of the shadowed module. No more need for 'mod'
local localPlayer = {
	greet = "Hello World" -- The public state you define here will also be available on the parent module
}

-- 'preload' amd 'postload' are called automatically when the file is first required. It's equivalent to placing code directly into 'onload', as you can see above.
function localPlayer:preload(parent)
	mj:log("Onload Called")
end

-- To shadow a function, just define it. The only different is the first argument should always be called 'super', and represents
-- the original function (which you should probably call).
function localPlayer:setMapMode(super, newMapModeOrNil, shouldSnap)
	mj:log("Before setMapMode")
	super(newMapModeOrNil, shouldSnap)
	mj:log("After setMapMode")
end

-- Public non-shadow functions that you define will automatically be available on the base game module.
function localPlayer:newFunction()
	mj:log("New Function")
end

-- This line does all the work for you. It will convert the current `localPlayer` module, into a module matching the format of Sapiens.
return shadow:shadow(localPlayer)
```

In case this example wasn't clear, what's happening here is that `shadow:shadow` performs a *transformation* on your code, taking a straight-forward lua file, and re-configuring it under the hood to use the `mod:onload` syntax.

So, in a nutshell, `shadow:shadow` defines `mod:onload`, and runs the following logic inside of it:

 - Copies local variables from the shadow module into the parent module (i.e., greet)
 - Iterates over the functions in the parent module, and checks the shadow for functions with the same name. If they exist, shadow them automatically.
 - Takes any remaining functions in the shadow, and copies them into the parent (i.e., newFunction)

### Style Suggestion

To make it easier to understand shadows, I suggest two style tips:
 1. Always call the first argument of a shadowed function `super`
 2. Use the @shadow annotation comment

Example:

```lua

--- @shadow
function localPlayer:setMapMode(super, newMapModeOrNil, shouldSnap)
	...
end
```

### Debugging Tip

To debug the shadowing module, you can always print out the resulting module:

```lua
local debugLocalPlayer = shadow:shadow(localPlayer)
mj:log(debugLocalPlayer)
return debugLocalPlayer
```

### Common Issue

One last thing to note, is `self` vs. the module name.

:::info
In short: Use `self` inside of shadowed functions to gain a reference to the true parent module. Using the module name will just give you a copy of the current file,
which isn't what you want.

If this is confusing for you, try printing out `self` and `localPlayer` to see the difference.
:::


Imagine you're shadowing a fake file called 'birdBath.lua'

```lua
function birdBath:fillWithWater(super, liters)
	...
end
```

Inside of this function, it's very natural that you want to access the 'birdBath' module, to access the internal state. For example:

**WRONG**
```lua
function birdBath:fillWithWater(super, liters)
	super(liters)
	mj:log("New Water Level: " .. birdBath.waterLevel)
end
```

As you might have noticed, using `birdBath` to refer to the module is WRONG. At this point, `birdBath` will refer to the *current file*, not the actual birdBath module (the base game module, containing water level information).

**RIGHT**
```lua
function birdBath:fillWithWater(super, liters)
	super(liters)
	mj:log("New Water Level: " .. self.waterLevel)
end
```

The correct way to refer to the actual `birdBath` module is using the `self` variable, which is special in lua, and contains the parent module. Once the `shadow:shadow` nonsense is finished, the shadowed function will exist in `birdBath`, meaning that `self` correctly refers to the *parent* module, not the current module.

