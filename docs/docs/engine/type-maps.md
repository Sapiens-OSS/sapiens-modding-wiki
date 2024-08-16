# Type Maps

Type maps are an optimisation technique to avoid passing string-based table keys around all over the place. In addition, they protect again changing indexes of tables (by additional content being inserted by an update or mod) by internally managing them through a variety of techniques. Because of this, they have a few limitations and requirements.

Type maps are saved on the server alongside the world database every time a world is created or loaded, and are sent to clients on connect. This way, if for example, two new mods add new types of objects to an existing world, the indexes won't be different depending on which mod(s) load.

## Usage

Type maps can be created with `typeMaps:createMap` and added to with `typeMaps:insert`.

You cannot simply iterate over a typeMap, due to the internal protections against index mismatching. So to iterate over types, use `typeMaps:createValidTypesArray` after all types have been added.

You also need to ensure that your own types are all added before any vanilla code generates a validTypes array, or otherwise the vanilla game will not know your content exists.
