# Creating Objects in DDAPI

Objects can be created by defining a config file in `mod/hammerstone/objects/<name>.json`

##  Hello World Example

Here is a simple example which creates a linked `resource` and `object`. It references base-game models, so you can safely copy/paste.

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
				"link_to_storage": "coconut"
			}
		}
	}
}
```

## Game Objects Vs. Resources

There are two main lists of items in Sapiens, with huge crossover:
 - `gameObject.lua` defines a *list of distinct objects* such as `apple` and `birchBranch` and `pineBranch`
 - `resource.lua` defines *object categories* such as `apple` or `branch`

The general rule is that game objects are *linked* to resources. i.e., every branch in Sapiens is part of the `branch` resource. For simple objects, like `coconut`, it's fully 
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

# Components
Here is a list of components, their default value in parenthesis.
## hs_object
Base definition for most objects (e.g: branches, fruits..).
### model
The .glb file used to display this object in the world, and as an icon.
### scale (1)
### physics (true)
### link_to_resource
For objects defined as variations of a resource. E.g: 'branch' for branch objects (appleBranch, aspenBranch, birchBranch..)
### props
Stands for 'properties'. The fields there are copied directly into the final object, with no additional processing

## hs_evolving_object
For objects that decay or transform over time, such as food or fresh pottery.
### time_years
### time_days
### transform_to

## hs_resource

### display_object
The .glb file for the icon.
### storage_identifier
### props

## hs_craftable
For craftable objects such as bowls...
### hs_output
### skill
### tool
### resources
### craft_area
### action_sequence
### build_sequence
### classification (craft)
### build_model (craftSimple)
### display_object
### props

## hs_buildable
For buildings' elements such as walls, roofs..
### classification
### ignore_build_ray
### has_collisions
### clear_ground
### allow_placement_collisions
### build_completion_plan
### seat_type
### craft_area
### model_placeholder (Array)
Defines how to place the resources used into the final buildable, using the empties' transform from the .glb file. ﻿Empties' name must conform to the pattern `<resourceName>_<index>`.

For instance, the following config defines how to use the empties of a model:
* "branch_1" to place a branch - say the vertical one,
* "branch_2" to place the other branch (horizontal), also defining a default custom model (a smaller branch),
* "branch_store" to define the area relative to the build model where resources will be gathered prior to building - usually at ground level, a meter or something from the build...
```json
	"model_placeholder": [
	        {
                        "key": "branch_1",
                        "resource": "branch"
                },
                {
                        "key": "branch_2",
                        "resource": "branch"
                        "default_model": "horiz_support",
                },
                {
                        "key": "branch_store",
                        "is_store": true
		}
	]
```
in the config, 'is_store' is what defines the temporary store.

### props
- allowBuildEvenWhenDark (false)
- allowYTranslation (true)
- allowXZRotation (true)
- noBuildUnderWater (true)
- canAttachToAnyObjectWithoutTestingForCollisions (false)

## hs_harvestable
For resources such as branches...
### resources_to_harvest
### finish_harvest_index

## hs_mob
For creatures
### dead_object
### animation_group
### props

## hs_tool

### damage
### durability
### speed


