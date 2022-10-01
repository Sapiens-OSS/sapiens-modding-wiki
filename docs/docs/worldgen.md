# World Generation

World generation is split across multiple parts, knowledge of [C modding](/guide/c-getting-started.md) is required.

## Vertex Terrain Generation

Vertex Terrain generation determines the height of every point in the world. This height is represented in the [prerender coordinate scale](/docs/visuals/coordinates).

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
- `noise1: SPNoise*` An instance of a noise generator, can be used to get smooth noise values at a given point
- `noise2: SPNoise*` An instance of a noise generator, can be used to get smooth noise values at a given point, difference with `noise1` is unknown
- `pointNormal: SPVec3` The normalized location on the planet , you can imagine it as sampling points on a sphere with `(0,0,0)` as the center and a radius of `1`. 
- `noiseLoc: SPVec3` 
- `worldGenOptions: SPWorldGenOptions` Options for the world generator, set in the UI when the user is generating a new world. 
- `riverValue: double` 
- `riverDistance: double` Distance to the closest river

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

The return value from te function is a vector with 4 components. The first component is the height, the other components are currently unknown and in the vanilla implementation always `riverDistance`, `0` and `0` respectively. 

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

It's currently unknown how biome and climate assignment works, the vanilla implementation can be found in the [splugins](https://github.com/Majic-Jungle/splugins/blob/main/SPVanilla/src/SPBiome.c) repository.

## Particle Engine

It's currently unknown how the particle engine works, the vanilla implementation can be found in the [splugins](https://github.com/Majic-Jungle/splugins/blob/main/SPVanilla/src/SPParticles.c) repository.