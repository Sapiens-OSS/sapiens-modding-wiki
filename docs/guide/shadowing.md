# Lua Shadows

Mods that wish to override or add Lua code can do so by creating their lua files in a directory structure that mirrors the game's scripts directory.

For example, if you wanted to override something in `world.lua` you would place a file in `MOD/scripts/mainThread/world.lua`.

`WARNING:` Shadows are more complex than just copy/pasting the games source files and editing them. Please read further to understand how you can use Shadowing to manipulate game logic!

## File Structure

Once you've created your lua file, you need to add some mandatory structure. This example will show a shadow for `world.lua`:

```lua
-- You can call the module anything you want, but the convention is to use 'mod'
local mod = {
    loadOrder = 1 -- Load order determines which mod 
}

-- This function will be called the first time`'world.lua` is `mjrequired`. The `world` argument represents the original lua module, defined in Sapiens codebase:
function mod:onload(world)
end 

return mod
```

As you can see, all you need to do is create a new lua module, and define a special function called `onload`, which takes a single argument, representing the original lua module.

## Overriding Attributes

In lua, an attribute is a property which is defined directly in the module definition. For example, in `world.lua`, you will fine:

```lua
local world = {
	isVR = false,
	hasUsedMultiselect = false
}
```

To change a property using a shadow, you would do something like this:

```lua
function mod:onload(world)
	world.isVR = true
end
```

## Overriding Public Functions

In lua, public functions are defined like this:

```lua
function world:togglePause()
	isTemporaryPauseForPopup = false
	tutorialUI:playerToggledPause()
	local speedMultiplierIndex = world:getSpeedMultiplierIndex()
	if speedMultiplierIndex ~= 0 then
		logicInterface:callServerFunction("setPaused", true)
	else
		logicInterface:callServerFunction("setPaused", false)
	end
end
```

Let's investigate how we can 'shadow' this function:

```lua
function mod:onload(world)
	-- Store a copy of the original function. Prefixing 'super' is convention.
	superTogglePause = world.togglePause

	-- Redefine the function
	world.togglePause = function(self)
		mj:log("You can run any logic you want here :)")

		-- You should generally call 'super' after or before your custom logic
		-- to ensure that you don't break sapiens functionality.
		superTogglePause(self)
	end
end
```

### Notes

1. You don't need to store or call super. If you don't, the base functionality of sapiens will be completely absent.
2. There exists an equivalent syntax for overriding functions using the `world:togglePause` syntax. This is against conventions however, as it hides the fact that a function is being overriden.

## Limitations

The shadowing system in sapiens is not arbitrarily powerful. It has a few huge limitations, which can make it difficulty or impossible to work with. 

First and foremost, you cannot override or manipulate local functions or variables. For example, in `world.lua`, there exists code like this:

```lua
-- This cannot be accessed via 'world.hasQueuedResearchPlan'
local hasQueuedResearchPlan = false

-- This cannot be accessed via 'world.setTimeFromSunRotation'
local function setTimeFromSunRotation(sunRotation)
	logicInterface:callServerFunction("setTimeFromSunRotation", {
		rotation = sunRotation
	})
end
```

### Working around Limitations

This limitation can be mitigated by understanding that local functions and variables are ONLY used within the actual file they are defined in. 

By definition it's possible to replace these local definitions "implicitly", by shadowing and redefining all usages. 

For example if `local foo` is called in `world:bar` and `world:baz`, it will be possible to shadow these two exposed functions, and therefor rewrite them so they don't call `foo`, or call a local, modified version in your own file.

This isn't considered sustainable though!

## Bootstrapping

Every mod will require at least one shadow to "bootstrap" the rest of your code. If you just write your own lua code, the game will never know it exists and thus will never execute it. 

*Note: Realistically you need at least one shadow per lua thread to bootstrap cross-thread logic.*

Once bootstrapped though, it's completely possible (and desirable!) to write your logic in its own file, instead of shoe-horning it into shadows.

To do this, you simply shadow a file (such as `controller.lua`) for the purpose of calling `init` methods on your other files:

```lua
local mod = {
	loadOrder = 1,
}

local foo = mjrequire "foo/bar

function mod:onload(controller)
	foo:init()
end

return mod
```

