# Model Format

### Importing Models

In Sapiens, `.glb` models can be found inside of `GameResources/models`. These can be imported into blender using `file -> import -> glTF 2.0`.

### Understanding the Format

Sapiens models are generally made up of standard geometry, paired with 'meta data', represented via empties. You can [learn how materials work here.](/docs/materials).

![](/images/docs/model-format/example.png)

### Per-Model empties

Some empties are per-model, and are used directly by dave for logic. They aren't required for all models.

For example, `coconutTree` contains empties `coconut_1` through `coconut_4`. These are used to position the `coconut` model in-game.

## Known Empties

This section will explain a list of known empties, and their effects.

### pathNode_box_n

These empties are used to provide pathfinding information to the Sapiens navigation server. Semantics are unknown.

### bounding_radius

This empty is used to provide a bounding box for your model. Semantics are unknown.

### static_box

Unknown

### placeCollide_n (box/sphere)

Unknown

### rayTestLimits_box_n

Unknown