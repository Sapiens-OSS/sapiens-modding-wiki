# Shadowing with Hammerstone

:::info
This page builds upon the explanation inside of the base-game [shadowing explanation](guide/shadowing).
:::

Shadowing in Sapiens is very important, because it allows us to hook our custom logic into base game functions.

### Default Shadowing

In the base game, shadowing is implemented by calling a special function called `onload`, with a single param, representing the 
original base game module.

This module can be used to 'hook' or override functions, change local state, etc.

Here is an example, which shows:
 - Injecting a variable (greet)
 - Shadowing a function (setMapMode)
 - Injecting a new function (newFunction)
 
```lua
local mod = {loadOrder = 1}

-- Define a new function.
local function newFunction()
	mj:log("NEW FUNCTION")
end

function mod:onload(localPlayer)              -- localPlayer variable refers to the 
	localPlayer.greet = "Hello World"         -- Define a new 'greet' variable on the module

	super_setMapMode = localPlayer.setMapMode -- Save the original 'setMapMode' function to a local var (the "super"), so we can re-call it layer
	localPlayer.setMapMode = function(self, newMapModeOrNil, shouldSnap)
		mj:log("PRINT BEFORE")
		super_setMapMode(newMapModeOrNil, shouldSnap) -- Call the super, so that the base game logic continues to be called.
		mj:log("PRINT AFTER")
	end

	localPlayer.newFunction = newFunction -- Remap the local 'newFunction' so that it's available on the `localPlayer` module.

end
return mod
```

As you can see, once you have access to the `localPlayer` module you have a *lot of freedom* to update and change it's behavior -it's just a bit finicky.

### Shadowing Utility

Hammerstones solution to the above syntax is something called the *shadowing utility* which you can import like so:
 - `mjrequire "hammerstone/utils/shadow"`

Once you've imported this module, you have access to the `shadow:shadow` function, which takes in a lua module, and re-configures it as a valid shadow. Here is the same
example from above, rewritten using this utility:

```lua
-- Include the shadowing utility
mjrequire "hammerstone/utils/shadow"

-- Start by defining a module matching the name of the shadowed module. No more need for 'mod'
local localPlayer = {
	greet = "Hello World" -- The public state you define here will also be available on the parent module
}

-- To shadow a function, just define it. The only different is the first argument should always be called 'super', and represents
-- the original function (which you should probably call).
function localPlayer:setMapMode(super, newMapModeOrNil, shouldSnap)
	mj:log("PRINT BEFORE")
	super(newMapModeOrNil, shouldSnap)
	mj:log("PRINT AFTER")
end

-- Public non-shadow functions that you define will automatically be available on the base game module.
function localPlayer:newFunction()
	mj:log("NEW FUNCTION")
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