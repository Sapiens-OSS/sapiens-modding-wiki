# Save State

The saveState is rather simple. Include it like this:

```lua
local saveState = mjrequire "hammerstone/state/saveState"
```

## Getting a state
```lua
function saveState:get(key, --[[optional]] default) ...
```

Which gets the value from the key.

## Setting a state

```lua
function saveState:set(key, value) ...
```

Which saves a value to the world file. 