# Save State

The save-game system in sapiens is very complex, with lots of cross-thread communication and different ways to save data (runtime only, server only, tribe only, etc).

This module makes this much easier, by providing you a one-file API for accessing game-state variables, from any thread. These variables will be saved to disk, and will be available next play.

### Including

```lua
local saveState = mjrequire "hammerstone/state/saveState"
```

### Example

A good example is the 'creative mode' mod, which has a couple of check-boxes to toggle things like 'instant build'. To persist the state of the checkboxes between runs, the save-state system is used.

## API

Hammerstone provides a frankly magical abstraction here. The save-state system is available on any thread, from any location. The data-ferrying will be handled for you. This system works by intercepting which thread the call originated from, and then modifying the implementation, based on that. For this to work, the signatures of the functions include a table.

For example, if you're calling something on the _server_, you're responsible for passing in the client-ID of the client that you're creating a save value for. If you're calling on the client, this is not needed, since the client ID is known.

## Functions

Please see the file yourself for in-depth lua-doc style comments and explanations.

### Save State (main)

- `saveState:setValue(key, value, paramTable)`
- `saveState:getValue(key, paramTable)`
- `saveState:getValueClient(key, defaultOrNil)`
- `saveState:getValueServer(key, clientID, defaultOrNil)`
- `saveState:setValueServer(key, value, clientID)`

### Utilities

- `saveState:resolveClientID(paramTable)`
- `saveState:resolveClientID(paramTable)`

### World State (old)

- `saveState:getWorldValue(key, --[[optional]] default)`
- `saveState:getWorldValueFromServer(clientID, key)`
- `saveState:setWorldValue(key, value)`
