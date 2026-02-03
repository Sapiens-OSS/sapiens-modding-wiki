# Model Format

Sapiens models are stored in the `.glb` (glTF 2.0) format, inside of the `models` directory. They can be imported into Blender using **File -> Import -> glTF 2.0**.

## Setting up for Blender

::: warning
You need to do this or your model won't scale correctly.
:::

Make sure that you set the 'Mode' to `Quaternion (WXYZ)` under Object Properties (orange square tab). Whenever you want to scale your model, make sure to use `Ctrl + A` and select 'All Transforms'.

![](/images/docs/model-format/blender-transform-mode.webp)

## Understanding the format

Sapiens models are generally made up of standard geometry, paired with metadata stored as empties. You can learn how materials work [here](/docs/models/materials).

![](/images/docs/model-format/example.webp)

### Placeholder empties

Some empties are per-model, and are used directly by dave for logic. They aren't required for all models!

For example, `coconutTree` contains empties `coconut_1` through `coconut_4`. These are used to position the `coconut` model in-game.

These empties are usually paired with code in the `scripts/common/modelPlaceholder.lua`, so look there for explanation.

### Unused empties

The "Camera" and "Lamp" objects are just default Blender objects that the developer tends to leave in there, as they have no effect on the in-game model.

## Known Empties

This section will explain a list of known empties, and their effects.

### icon_camera

Used to render the icon.

### pathNode

`pathNode` primitives are extra nodes that are added to the pathfinding. 

They are especially important for doorways, as otherwise it's unlikely that sapiens will happen to find nodes that go through the gap. They're also added at corners, and on walkable surfaces like floors and steps. 

The engine doesn't actually place nodes in those locations directly, as the ground might be uneven, but it casts rays through those positions, to try to find a ground position for the pathfinding.

### bounding_radius

`bounding_radius` is used to provide a bounding box for your model. Semantics are unknown.

### placeCollide

`placeCollide` primitives are used when placing the object in build mode or planting/decorating, to ensure there are no collisions, eg to stop you placing 100 plants in the same spot.

### static and dynamic primitives

`static` primitives are used in the physics when the objects are static, and also for other purposes, but can't remember all of them off the top of my head. `dynamic` primitives are for when the object is loose and falling. I think the idea was that the static ones would be more complex, but in practice they are usually the same.

### rayTest limits & other

`rayTest` limits, `lookat` boxes and a few others are typically various hacks for performance. 

For example, the coconut tree: because it is so tall and thin causes performance problems when you are looking through them. Once it hits the bounding radius, it checks every triangle, so the ray test limit is used to reduce that.

## Model Remaps

In Sapiens, it's common to use the same base model (geometry, empties, etc), but use unique materials. This is done in `scripts/common/model.lua`, `model.remapModels`.

Here is an example:

```lua
willowBranch = {
	appleBranch = {
		darkBark = "appleBark",
		willowWood = "appleWood",
	},
	orangeBranch = {
		darkBark = "orangeBark",
		willowWood = "orangeWood",
	},
	peachBranch = {
		darkBark = "peachBark",
		willowWood = "peachWood",
	},
},
```

This example is creating three new models, based on the `willowBranch.glb` model. The models are called `appleBranch`, `orangeBranch`, and `peachBranch`. The data inside each of these new models is used to reassign the materials.

So for example `appleBranch` remaps the material `darkBark` to be `appleBark`, and `willowWood` into `appleWood`.
