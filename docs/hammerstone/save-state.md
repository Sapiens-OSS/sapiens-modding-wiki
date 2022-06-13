# Save State (saveState)
The saveState is rather simple. Include it like this:
```lua
local saveState = mjrequire "hammerstone/state/saveState"
```

## Setting a state
`saveState` has the following function:
```lua
function saveState:set(key, value) ...
```
Which saves a value to the world file. 
## Getting a state
`saveState` has the following function:
```lua
function saveState:get(key, --[[optional]] default) ...
```
Which gets the value from the key