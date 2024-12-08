# Creating Objects in DDAPI

Objects can be created by defining a config file in `mod/hammerstone/objects/<name>.json`

::: tip Use Cheats
When testing your mods, it's very useful if you can quickly inspect and cheat in items. Since you've already started using Hammerstone, you might as well pull in [Creative Mode](https://github.com/SirLich/sapiens-creative-mode) as well for development.
:::

## Hello World example

Here is a simple example which creates a linked `resource` and `object`. It references base-game models, so you can safely copy/paste directly into your mod. After adding this file, the new item should appear in game.

This will create a new item called `coconut_2`, which you can spawn and decorate with. It can be picked up and stored with the other coconuts (link to storage), but
it has no other behaviors (cannot be eaten, or rot, or crafted with).

```json
{
  "hammerstone:object_definition": {
    "description": {
      "identifier": "coconut_2"
    },
    "components": {
      "hs_object": {
        "model": "coconut"
      },
      "hs_resource": {
        "storage_identifier": "coconut"
      }
    }
  }
}
```

## Game Objects vs Resources

There are two main lists of items in Sapiens, with huge crossover:

- `gameObject.lua` defines a _list of distinct objects_ such as `apple` and `birchBranch` and `pineBranch`
- `resource.lua` defines _object categories_ such as `apple` or `branch`

The general rule is that game objects are _linked_ to resources. i.e., every branch in Sapiens is part of the `branch` resource. For simple objects, like `coconut`, it's fully
expected that it will be defined as both a `gameObject` and a `resource`.

Here is a quick refresher:

### Game Object

- Can be spawned `spawn(...)`
- Exists physically in the world (has a model)
- Contains properties like physics, model scale
- How object transforms when eaten (i.e., meat -> bone)

### Resource

- Defines how the object is stored/carried (i.e., all branches have same storage definition)
- Defines food nutrition
- Can be crafted with (i.e., you don't craft with a `birchBranch` you craft with a `branch` -the game figures the rest out)

## Schema

Refer to the [JSON schema](https://github.com/Sapiens-OSS/hammerstone-schemas/blob/main/schemas/object.schema.json) for all the possible values.
