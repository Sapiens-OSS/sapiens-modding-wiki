# World Generation

World generation is split across multiple parts, knowledge of [C modding](/guide/c-getting-started.md) is required.

## Common Objects

Common objects are used in more than one stage of world generation.

### SPWorldGenOptions

`SPWorldGenOptions` is used to pass settings from the GUI to the generation functions. 
It's used in `spHeightGet` for vertex height generation and `spRainfallGet` for rainfall generation.
It's defined in `SPCommon.h`

```C
struct SPWorldGenOptions {
	double heightOffset;
	double rainfallMultiplier;
	double temperatureOffset;
	SPVec3 scales;
	SPVec3 influences;
}
```

### SPNoise

`SPNoise` is part of the noise generation system. While the exact details are unknown it can be used to generate noise values or generate things with a chance.

## Vertex Terrain Generation

Vertex Terrain generation determines the height of every point in the world. This height is represented in the [prerender coordinate scale](/docs/visuals/coordinates).
The methods required for vertex generation are defined in `SPHeight.h`.

::: tip
You can convert meters into the prerender scale by using the `SP_METERS_TO_PRERENDER` macro:
```c
double heightInPrerenderScale = SP_METERS_TO_PRERENDER(heightInMeters);
```
:::

### Methods

The following methods can be overridden to implement custom vertex terrain generation. 

#### spHeightGet

- `previousHeight: SPVec4` when `spReplacesPreviousHeight` returns false, then previousHeight is the output of the previous mod, otherwise it should be ignored
- `noise1: SPNoise*` An instance of a noise generator, can be used to get smooth noise values at a given point.
- `noise2: SPNoise*` An instance of a noise generator, can be used to get smooth noise values at a given point. Same as `noise1` but initialized with a different seed. 
- `pointNormal: SPVec3` The normalized location on the planet , you can imagine it as sampling points on a sphere with `(0,0,0)` as the center and a radius of `1`. 
- `noiseLoc: SPVec3` Position to sample noise values at, defined as `pointNormal + vec3(1.2, 1.2, 1.3)` as noise generation breaks down at coordinates `<=0`
- `worldGenOptions: SPWorldGenOptions` Options for the world generator, set in the UI when the user is generating a new world. 
- `riverValue: double` Used as a crude height multiplier. 
- `riverDistance: double` Distance to a nearby river if one is close enough.

::: tip
You can calculate the latitude and longitude as follows:

```c
    double lat = asin(pointNormal.y);

    double lon = 0;
    if (fabs(pointNormal.x) + fabs(pointNormal.z) > 0.0000001) {
        lon = atan2(pointNormal.z, pointNormal.x);
    }
```
:::

::: warning
Some points are `NaN`, the vanilla implementation returns `NaN` at these points. Returning anything else seems to cause artifacts on the equator of the planet.
:::

The return value from te function is a vector with 4 components. The first component is the height, the other components are currently unused and in the vanilla implementation always `riverDistance`, `0` and `0` respectively.  

#### spReplacesPreviousHeight

This method has no arguments, when `true` is returned the output of the previous mod is ignored. If `false` is returned the output of the previous mod is passed to `spHeightGet`

### Example

Below is the code for the `FlatTerrainMod` which returns a height of 10 for every position in the world and generates a planet that has flat terrain.
```c
#include "SPHeight.h"

bool spReplacesPreviousHeight()
{
	return true;
}

SPVec4 spHeightGet(SPVec4 previousHeight, //if spReplacesPreviousHeight returns false, then previousHeight is the output of the previous mod, otherwise it should be ignored.
                   SPNoise* noise1,
                   SPNoise* noise2,
                   SPVec3 pointNormal,
                   SPVec3 noiseLoc,
                   SPWorldGenOptions worldGenOptions,
                   double riverValue,
                   double riverDistance) {


    SPVec4 result = {SP_METERS_TO_PRERENDER(10), riverDistance, 0.0, 0.0};
    return result;
}
```

::: details Result of the above code
![](/images/docs/c-mods/flat-planet-result.png)
:::

## Biome and Climate assignment

::: danger Oh-no!
This section isn't done. But you can help! Click the 'Edit Page' button at the bottom.
:::

::: info
This section mentions the vanilla code several times. You can find it [here](https://github.com/Majic-Jungle/splugins).
:::

Biomes are assigned in this stage of world generation, objects like trees and rocks are placed in this stage of generation.

### Objects

Objects that are common to multiple methods during biome generation.

#### SPBiomeThreadState

Allows the biome generator to get indices for various objects generated on the Lua side. 

```C
struct SPBiomeThreadState {
	void* terrainGenerator; //private
	void* gom; //private

    // The following methods can be called to get the index from the lua typeMap for various types of objects.
	uint16_t (*getBiomeTag)(struct SPBiomeThreadState*,char*); // Get the index for the given biome tag, eg "hot". 
	uint32_t (*getTerrainBaseTypeIndex)(struct SPBiomeThreadState*,char*); // Get the index for the given terrain base type, eg "riverSand"
	uint32_t (*getTerrainVariation)(struct SPBiomeThreadState*,char*); // Get the index for the given terrain variation, eg "grassSnow"
	uint32_t (*getTerrainModification)(struct SPBiomeThreadState*,char*); // Get the index for the given terrain modification, eg "preventGrassAndSnow"
	uint32_t (*getGameObjectTypeIndex)(struct SPBiomeThreadState*,char*); // Get the index for the given object type, eg "appleTree". Note that this method can be null and has to be checked for existence

	uint32_t (*getMaterialTypeIndex)(struct SPBiomeThreadState*,char*); 
	uint32_t (*getDecalGroupTypeIndex)(struct SPBiomeThreadState*,char*);

	SPSurfaceTypeDefault (*getSurfaceDefaultsForBaseType)(struct SPBiomeThreadState*,uint32_t);
	SPSurfaceTypeDefault (*getSurfaceDefaultsForVariationType)(struct SPBiomeThreadState*,uint32_t);

	uint32_t (*getSurfaceBaseTypeForFillObjectType)(struct SPBiomeThreadState*,uint32_t);

	SPRand* spRand;
	SPNoise* spNoise1;
	SPNoise* spNoise2;
}
```

### Methods

The following methods can be overridden to implement custom biome generation. 

#### spBiomeInit

- `threadState: SPBiomeThreadState*` 

This method has no return value, the method is used to initialize static variables with indices of the relevant object.  

#### spBiomeGetTagsForPoint

It's currently unknown what this method exactly does. You can help by checking out the vanilla code!

#### spBiomeGetSurfaceTypeForPoint

It's currently unknown what this method exactly does. You can help by checking out the vanilla code!

#### spBiomeGetTransientGameObjectTypesForFaceSubdivision

 - `threadState SPBiomeThreadState*` The state of the thread including noise generators and a RNG object.
 - `incomingTypeCount: int` Amount of already generated objects
 - `types: uint32_t*` Array of types to be generated with size `BIOME_MAX_GAME_OBJECT_COUNT_PER_SUBDIVISION`. 
 - `biomeTags: uint16_t*`Array of biome tags at the position to generate. 
 - `tagCount: int` Amount of biome tags at the position to generate
 - `pointNormal: SPVec3` 
 - `noiseLoc: SPVec3` Location to be used in conjunction with the given noiseGenerator.
 - `faceUniqueID: uint64_t` The unique id of the face, can be used to get random values.
 - `level: int` The level of subdivisions the face has undergone. 
 - `altitude: double` Altitude of the face
 - `steepness: double` 
 - `riverDistance: double`

This method is responsible for spawning gameobjects, this ranges from rocks to trees. Adding gameobjects is done by adding the relevant index (acquired in `spBiomeInit`) the `types` array. It's your responsibility that you write to indices within the range `[incomingTypeCount, BIOME_MAX_GAME_OBJECT_COUNT_PER_SUBDIVISION)`. 
Vanilla has a helper macro for this, it requires you to define an integer at the top of the method (`int addedCount = incomingTypeCount`):
Note that this method is called for all mods enabled (this includes vanilla!) and you can thus already have gameobjects in the `types` array. It's possible to overwrite previous mods by overwriting previous indices. 

```C
#define ADD_OBJECT(__addType__)                                                \
  types[addedCount++] = __addType__;                                           \
  if (addedCount >= BIOME_MAX_GAME_OBJECT_COUNT_PER_SUBDIVISION) {             \
    return addedCount;                                                         \
  }
```

Vanilla spawns different kinds of objects at different subdivision levels, look at the vanilla code for specifics.

## Particle Engine

It's currently unknown how the particle engine works, the vanilla implementation can be found in the [splugins](https://github.com/Majic-Jungle/splugins/blob/main/SPVanilla/src/SPParticles.c) repository.