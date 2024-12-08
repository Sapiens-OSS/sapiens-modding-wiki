# Lua Builders

Builders are a hybrid approach between normal modding, and config driven modding. Instead of defining each config in it's own file, builders allow you to create lots of definitions at once, all from a single file. This is possible via defining a Lua module that defines an "interface" of functions. Hammerstone will call these functions automatically, and interpret the list of results as objects to create via Hammerstone. Builders are useful when you want to generate lots of similar objects, or need more programatic control.

## Define a Builder

`builders` are defined inside of `hammerstone/builders/*.lua`. Unlike all other config files, they MUST be defined in lua -not json.

## Format of a Builder

The base file will look something like this:

```lua
local gen = {}
return gen
```

In other words, its a totally normal module. The trick is you need to define some (optional) functions. These are:

- `getObjectConfigs()`
- `getMaterials()`
- `getModelRemaps()`
- `getResourceGroups()`

The return result should be a list of valid ddapi configs.
