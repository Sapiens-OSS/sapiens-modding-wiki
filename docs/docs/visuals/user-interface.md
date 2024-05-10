# User Interface (UI)

UI in Sapiens is fairly complex, and the extent of it has not been fully documented. Subsequently, we recommend Hammerstone's UI Manager to ease the burdens of creating UI.

::: tip Hammerstone Edition&#8482;
We recommend you use Hammerstone for managing UI. You can find the Hammerstone docs [here](/hammerstone/systems/ui-manager.md).
:::

## Getting Started

To get started, you should start with an entry point that contains UI that you can hook into. For example, `scripts/mainThread/ui/gameUI`.

Then, you can create a view:

```lua
mainView = View.new(gameUI.view)
```

Every time you create a new View, pass in your parent view as the first argument.

**Note:** `View` and other kinds of views such as `ImageView` are not defined in Lua, instead as environment globals. Despite what your IDE may be telling you, it is safe to use them.

On each view you can set fields such as:

- `Hidden` : `bool`
- `RelativePosition`: `ViewPosition`
- `size` : `vec2`
- ...

## UI Types

Use the official documentation surrounding the UI types. You can find it [here](https://github.com/Majic-Jungle/sapiens-mod-creation/wiki/UI-Views).
