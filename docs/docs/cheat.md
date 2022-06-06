# Cheats in Sapiens

Sapiens contains a few tools to cheat, built automatically into the game. It is unknown if dave will remove these before launch!

## Debug Menu

To access to the debug menu, you can select it from the settings tab:

![](/images/cheat/debug_settings.png)

It is suggested that you enabled the debug display checkbox, which will enable two additional displays:

### Debug Display

The debug display shows in the top right corner of your screen, and is similar to the `f3` tab in games like Minecraft. It will show your FPS, currently queued order totals, among other things.

![](/images/cheat/debug_display.png)

### Context Aware Debugging

The context aware debugger is an odd little "debug" button that will appear in the bottom left corner of your screen. It will allow you to perform a single "debug" action on the currently selected object.

![](/images/cheat/context_debug.png)

`note:` The debug button mostly won't do anything. Only specific contexts have any functionality.


## Lua Console

The Lua console can be summoned by pressing `c` to summon the chat window, then typing `/lua` to enter lua mode. This mode essentially allows you to execute lua code, although it does not store state between commands.

How to open console:

![](/images/cheat/lua_console.png)

Some examples:

![](/images/cheat/lua_examples.png)

## Lua Cheats

Once in lua mode, there are a few useful functions you might want to call:

### Spawn

 - Format: `spawn(object_id)`
 - Example: `spawn('mammoth')`
 - Description: Spawns the object if it exists, and places it at your feet.

### Instant Build Mode

 - Format: `completeCheat()`
 - Description: Enables instant build mode.