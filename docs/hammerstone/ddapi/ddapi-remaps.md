# DDAPI Remaps

This page provides Hammerstone alternatives to shadowing base lua files. If a file isn't listed here, you likely need to
create it, shadow it, and interact with Sapiens base code normally.

### gameObject.lua

Every 'thing' in Sapiens must be registered as a game object. For example; apple, mammoth, and fireplace are all game-objects.

Hammerstone: `hammerstone:object_definition/hs_object`

### resource.lua

A resource is like a 'category' for game objects. For example 'apple' resource might contain 'apple', 'rotten_apple' and 'crab_apple'.

Hammerstone: `hammerstone:object_definition/hs_resource`

### craftable.lua

A craftable is a "recipe" for creating new game objects by combining or working with other game objects. For example you can craft 'campfireRoastedBeetroot'
by roasting beets at a campfire.

Hammerstone: `hammerstone:object_definition/hs_craftable`

### evolvingObject.lua

Evolving objects are 'transformations' of existing objects. For example meat may become rotten, or hay may become dry. Evolving objects also allow despawning, such
as rotten meat, which removes itself after some time.

Hammerstone: `hammerstone:object_definition/hs_evolving_object`

### harvestable.lua

Harvestables are in-game objects which can be "harvested" for resources. The most common example would be animal carcases.

Hammerstone: `hammerstone:object_definition/hs_harvestable`

### storage.lua

Storage file in Sapiens defines both the 'carry' logic for an item, as well as it's ability to be stored in storage areas.

Hammerstone: `hammerstone:storage_definition`

### Object Sets (serverGOM.lua)

Object Sets are like 'groupings' for objects, such as all mobs, or all lit campfires. These object sets can be used to run some logic in other systems.

Hammerstone: `hammerstone:global_definitions/hs_object_sets`

## No Remaps

These files don't currently have a 'DDAPI' solution. In these cases, you should just define them normally:

- animations.lua
- sapienObjectSnapping.lua
