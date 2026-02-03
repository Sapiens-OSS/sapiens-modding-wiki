![Hammerstone Logo](/images/hammerstone/hammerstone_wide.webp)

Hammerstone is a modding API and framework for Sapiens. It aims to improve compatibility between mods and provide several useful features to mod developers. It has no functionality by itself.

Hammerstone has over 10,000 installs, so it's a "safe" dependency to include in your development journey. Anyone interested in using your mod will most likely have it installed already.

## Why use Hammerstone?

Modding is a tricky topic, because it requires interacting with _game code_ directly, often in uncomfortable, or unintuitive ways. The code cleanliness and design requirements for _writing a game_ are often quite different from the aspects that make a game fun and easy to mod.

Enter, **Hammerstone**. A framework provides a layer of insulation between game code, and modder code. And since modders have full control over this layer, we can pack it full of as many utilities and helpers as we want.

### Insulation from Game Code

When Sapiens updates, some mods may break. This is an undeniable risk of building projects against an early access game. By piping your logic through **Hammerstone**, you gain a layer of protection from these breaking changes. While your mod _may break_, it may also be automatically fixed when Hammerstone is updated to support the latest version of Sapiens. When everyone is using the same API, we can focus our efforts on bringing back compatibility, without changing the external API.

### A real API

Sapiens doesn't have a modding 'API' so to speak. You can shadow (override) files, and tweak functions and variables. If you're clever, you can add in nearly anything the base game offers: new plants, animals, items, buildables, menus, etc. But this isn't the same as having an 'API' to do these tasks.

Hammerstone is packed full of things targeted at modders so it acts as a public API for mod building.

## What does Hammerstone offer?

Hammerstone offers a _lot_, but it's generally broken into three sections:

### Simple Additions and Utilities

Hammerstone is implemented as a collection of shadows on base game code. These shadows use priority **0**, which means that when you shadow these self-same files, you are receiving a module which is pre-configured by Hammerstone for your use.

For example, Hammerstone adds the function `storage:addStorage`, which allows adding a storage, with logging and error checking. Without the `addStorage` method, you would need to inject the data yourself into the storage module, and re-configure the type-maps. Using Hammerstone allows you to benefit from these little utilities and functions, seamlessly integrated into the base game modules.

### Systems

Hammerstone offers a number of modules, external to any base game files, which you can require in your projects. These systems provide 'API' access to complex parts of the game code. In other words, rather than shadowing many files, in order to achieve a goal, you can rather require a Hammerstone system. Examples of systems include:

- `inputManager` for input handling
- `saveState` for writing and reading values into the save-game system (saved, for next play-through!)
- `uiManager` for registering UI classes into various 'slots'

### Data Driven API

Last but not least, Hammerstone offers a config-driven API for modding Sapiens. This ambitious effort transforms the data-flow in mods entirely, allowing you to define your mod as configuration files, rather than shadowing dozens of base game files. You can read more about the 'DDAPI' (data driven API) in its own section.