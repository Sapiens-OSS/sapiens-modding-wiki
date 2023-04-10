# Model Format

### Importing Models

In Sapiens, `.glb` models can be found inside of `GameResources/models`. These can be imported into blender using `file -> import -> glTF 2.0`.

### Setting Up for Blender

You need to do this or your model won't scale correctly.
Make sure that you set the scale type to `Quaternion (WXYZ)` under Object Properties. When you want to scale your model make sure to use `Ctrl + A` and select apply all transforms.

### Understanding the Format

Sapiens models are generally made up of standard geometry, paired with 'meta data', represented via empties. You can [learn how materials work here.](/docs/visuals/materials).

![](/images/docs/model-format/example.png)

### Placeholder Empties

Some empties are per-model, and are used directly by dave for logic. They aren't required for all models!

For example, `coconutTree` contains empties `coconut_1` through `coconut_4`. These are used to position the `coconut` model in-game.

This kind of logic is usually paired with something written into the `modelPlaceholder`, so you can look there for inspiration.

### Unused Empties

The "Camera" and "Lamp" objects are just default Blender things that dave tends to leave in there, as they don't do any harm.

## Known Empties

This section will explain a list of known empties, and their effects.

### icon_camera

Used to render the icon.

### pathNode

`pathNode` primitives are extra nodes that are added to the pathfinding. They are especially important for doorways, as otherwise it's unlikely that sapiens will happen to find nodes that go through the gap. They're also added at corners, and on walkable surfaces like floors and steps. The engine doesn't actually place nodes in those locations directly, as the ground might be uneaven, but it casts rays through those positions, to try to find a ground position for the pathfinding.

### bounding_radius

This empty is used to provide a bounding box for your model. Semantics are unknown.

### placeCollide

`placeCollide` primitives are used when placing the object in build mode or planting/decorating, to ensure there are no collisions, eg to stop you placing 100 plants in the same spot.

### static and dynamic primitives

`static` primitives are used in the physics when the objects are static, and also for other purposes, but can't remember all of them off the top of my head.  `dynamic` primitives are for when the object is loose and falling. I think the idea was that the static ones would be more complex, but in practice they are usually the same.

### rayTestLimits & Others

And there are ` rayTest`` limits,  `lookat`` boxes and a few other things I'm not even really sure of anymore. They are various hacks mostly for optimizations. Like the coconut tree because it is so tall and thin causes performance problems when you are looking through them, as once it hits the bounding radius, it checks every triangle. So the ray test limits reduce that.

And there are `rayTest` limits,  `lookat` boxes and a few other things I'm not even really sure of anymore. They are various hacks mostly for optimizations. Like the coconut tree because it is so tall and thin causes performance problems when you are looking through them, as once it hits the bounding radius, it checks every triangle. So the ray test limits reduce that.

# Model Remaps

In Sapiens, it's often desired to use the same base model (geometry, empties, etc), but use unique materials. This can be accomplished using `model.lua`, `model.remapModels`.

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

This example is creating three new models, based on the basic `willowBranch.gltf` model. The models are called `appleBranch`, `orangeBranch`, and `peachBranch`. The data inside each of these new models is used to remap the materials.
So for example `appleBranch` remaps the material `darkBark` to be `appleBark`, and `willowWood` into `appleWood`.


