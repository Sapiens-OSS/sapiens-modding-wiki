# Lua Configs

Often, when writing Hammerstone DDAPI mods, you might find the json-based API limiting, or annoying to use. In that case, use lua! You can write 1:1 the same configs, except just do it in lua instead.

Example (truncated):

```lua
local data = mjrequire "furniture/data"

return {
	description = {
		identifier = "chair"
	},
	components = {
		hs_object = {
			model = "chair"
		},
		hs_buildable = {
			skill = "woodBuilding",
			build_sequence = "clearObjectsAndTerrainSequence",
			...
		}
	}
}
```

## Why Lua?

One of the biggest reasons to use Lua is to use the [lua builder](./ddapi-lua-builders.md) format to generate lots of actors programatically. There are other reasons though as well, such as a preference for the syntax, or inline calculations.

## Props

When using Lua, the `props` field can be used to define some lua data that will be 1:1 copied to the base game object. For example, imagine you're creating an object in which `preventShiftOnTerrainSurfaceModification` MUST be true. This isn't something we bothered to add to the DDAPI yet, so by default, you're blocked.

`props` is the safety hatch. Simple define it like this:

```lua
hs_object = {
	model = "chair",
	props = {
		preventShiftOnTerrainSurfaceModification = true
	}
},
```

The results of the `props` will be moved into the object when it's created.

`props` is allowed in other places as well. For example, when defined inside of the `hs_evolving_object`, the `props` field will move that lua code into the evolving object definition. Same for resources, storage, craftables, etc.

If you're ever perusing a long list of objects in the base game code (e.g., `gameObject.lua`), and see a field you want to insert into your config, add it via `props`
