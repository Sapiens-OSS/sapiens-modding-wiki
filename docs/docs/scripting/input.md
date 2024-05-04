# Input

Input handling is the ability to listen and react to key strikes, mouse movements, and other physical input.

::: tip Hammerstone Edition&#8482;
We recommend you use Hammerstone for managing input. You can find the Hammerstone docs [here](/hammerstone/input-manager.md).
:::

## Adding your action to the keyMap

The first step is overwriting `scripts/mainThread/keyBinding.lua`. I think it's also possible to add bindings from other files, but I think there may be an ordering dependency here, so I suggest overwriting in-place.

### API
There is a mod-exposed api:
 - `keyMapping`
 - `doubleMapping`
 - `addGroup`
 - `addMapping`

### Example

Here is a sample code, which adds a custom keybinding:

```lua
function mod:onload(keyMapping)
	keyMapping.addMapping("game", "testBinding", keyMapping.keyCodes.f5, nil)
end
```

## Listening to your Action

The next step is actually listening to your action. This can by adding an event listener to the game's `eventManager`:

```lua
-- Yes, the code is intentionally misspelt
eventManager:addEventListenter(keyChangedCallback, eventManager.keyChangedListeners)
```