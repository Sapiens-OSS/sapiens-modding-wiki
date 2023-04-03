# Modifying terrain generation in C and Lua

In this tutorial, you will learn a bit about the terrain generation in Sapiens. We will add a new surface type to the game (coal), and have it be randomly generated in the world. It is based on the [Coal mod](https://github.com/nmattela/sapiens_coal_mod).

This tutorial will cover a bit about the C part, so please make sure you are familiar with C. Luckily however, there is very little code to write in C as most of the logic is actually programmed in Lua.

This tutorial is written for update 0.3.8. It is possible that this tutorial will not work for future updates.

## Getting started
To get started, follow the [getting started with Lua](/guides/lua) guide. This tutorial also uses the [Hammerstone framework](/hammerstone/getting-started) to make your life a bit easier. Additionally, read up on the [getting started with C](/guides/c) guide and make sure you have managed to run the flat terrain mod.

I personally use the [cmake template made by suppergerrie2](https://github.com/suppergerrie2/SapiensCModTemplate), but using the official visual studio project is of course also possible.

## The Lua part
We will begin with the Lua part, where we will have to define a game object, resource, storage, model and material for our `coal`. All the details for this can be found in the [creating craftable objects tutorial](/tutorials/creating-craftable-objects). I will skip those details here, so I will assume you have set up all the necessary boilerplating (defining the mod module, defining `mod:onload` and overriding `init`, `mjInit`, or `load` depending on the file), and the upcoming code snippets are expected to be added to the overriden function.

In `scripts/common/gameObject.lua`:
```lua
gameObject:addGameObject("coal", {
    modelName = "coal",
    name = "coal",
    plural = "coals",
    scale = 1.0,
    hasPhysics = true,
    resourceTypeIndex = resource.types.coal.index,
    objectViewRotationFunction = function(object)
        return mat3Rotate(mat3Identity, 0.1, vec3(1.0, 0.0, 0.0))
    end,
    markerPositions = {
        {
            worldOffset = vec3(0.0, mj:mToP(0.2), 0.0)
        }
    },
})
```

In `scripts/common/resource.lua`:
```lua
resource:addResource("coal", {
    name = "coal",
    plural = "coals",
    displayGameObjectTypeIndex = gameObjectTypeIndexMap.coal
})
```

In `scripts/common/storage.lua`:
```lua
storage:addStorage("coal", {
    name = "coal",
    displayGameObjectTypeIndex = typeMaps.types.gameObject.coal,
    resources = {
        resource.types.coal.index,
    },
    storageBox = {
        size =  vec3(0.1, 0.1, 0.1),
        rotationFunction = function(uniqueID, seed)
            local randomValue = rng:valueForUniqueID(uniqueID, seed)
            local rotation = mat3Rotate(mat3Identity, randomValue * 6.282, vec3(0.0,1.0,0.0))
            rotation = mat3Rotate(rotation, randomValue * 6.282, vec3(1.0,0.0,0.0))
            return rotation
        end,
    },
    maxCarryCount = 4,
    maxCarryCountLimitedAbility = 2,
    maxCarryCountForRunning = 1,
    carryType = storage.carryTypes.small,
    carryOffset = vec3(0.0,0.01,0.0),
})
```

In `scripts/common/model.lua`:
```lua
model.remapModels.dirt.coal = {
    dirt = "coal"
}
```

In `scripts/common/material.lua`:
```lua
mj:insertIndexed(material.types, {
    key ="coal",
    color = vec3(0,0,0),
    roughness = 1.1,
    metal = 1.1,
    colorB = vec3(0,0,0),
    roughnessB = 1.1 * 0.9,
    metalB = 1.1
})
```

This created our coal item, but we have not told the game that this item can also be found as a surface. Rock and clay are two examples from the vanilla game that are not just items you can build or craft with, and that can be stored in storage areas, but can also be found underground and at the sides of mountains, which can then be dug out or mined. We just did the former, but we still have to do the latter.

Adding coal as a terrain type (also called a surface type) requires us to define it in `scripts/common/terrainTypes.lua`. Note the use of Hammerstone here:
```lua
terrainTypes:addBaseType("coal", {
    name = "coal",
    material = material.types.coal.index,
    decalGroupTypeIndex = terrainDecal.groupTypes.dirtGrass.index,
    digOutputs = createStandardOutputs("coal"), -- <- You can find this function in the source code.
    fillObjectTypeKey = "coal",
    pathDifficultyIndex = pathFinding.pathNodeDifficulties.dirtRock.index,
    requiresMining = true, -- <- This states that this surface needs to be mined, not dug.
    disableSpawn = false, -- <- This states that Sapiens tribes can spawn on coal. This will be important as we will first test out our mod with a world full of coal
})

terrainTypes:addVariation("coal", { -- <- We define only one variation a.k.a. the default variation.
    name = "coal"
})
```

Finally, we will also shadow `scripts/common/flora.lua` to tell the game not to grow vegetation on a coal surface:
```lua
local terrainTypesModule = mjrequire "common/terrainTypes"
local terrainBaseTypes = terrainTypesModule.baseTypes

flora.mediumTypes[terrainBaseTypes.coal.index] = {
    soilQuality = flora.soilQualities.veryPoor
}
```

That concludes the Lua part. Note that I skipped the behavior of coal, such as that coal can be used to fuel campfires as this was covered in the previous tutorial.

Now that we have our coal item (which we can store in storage areas) and our coal surface (which we will find in our world and mine for), we still need to notify the terrain generator that this new surface type exists, and that this surface type can be generated. This is all done in the C part of the game.

## The C part

In the game's code, the file `SPBiome.h` defines all structs and functions concerned with biome and surface generation. Just like with Lua files, we can create a C file called `src/biome.c` where we `#include "SPBiome.h"`, and any functions that we define in `src/biome.c` will shadow the corresponding function in the source code.

We will begin by shadowing the function `spBiomeInit` in order to add our custom surface type:

```c
static uint32_t terrainBaseType_coal;
static uint32_t terrainVariation_coal;

void spBiomeInit(SPBiomeThreadState* threadState) {
    terrainBaseType_coal = threadState->getTerrainBaseTypeIndex(threadState, "coal"); // <-- It looks for a terrain type called "coal", defined in the Lua code
    terrainVariation_coal = threadState->getTerrainVariation(threadState, "coal"); // <-- Idem for our single variation
}
```

This registers our coal, but does not make any changes to the terrain generation yet. For that, we shadow the `spBiomeGetSurfaceTypeForPoint` function. We will start off easy and modify this function to generate a planet covered in coal (all surfaces will be turned to coal):

```c
SPSurfaceTypeResult spBiomeGetSurfaceTypeForPoint(SPBiomeThreadState* threadState,
                                                  SPSurfaceTypeResult incomingType,
                                                  uint16_t* tags,
                                                  int tagCount,
                                                  uint32_t* modifications,
                                                  int modificationCount,
                                                  uint32_t fillGameObjectTypeIndex,
                                                  int16_t digFillOffset,
                                                  uint32_t* variations,
                                                  SPVec3 pointNormal, 
                                                  SPVec3 noiseLoc, 
                                                  double baseAltitude,
                                                  double steepness,
                                                  double riverDistance,
                                                  int seasonIndex)
{
    SPSurfaceTypeResult result = incomingType; // <-- incomingType is the terrain type as generated by the vanilla game

    result.surfaceBaseType = terrainBaseType_coal; // <-- We instead set it to coal
    SPSurfaceTypeDefault defaults = threadState->getSurfaceDefaultsForBaseType(threadState, result.surfaceBaseType);
    result.materialIndex = defaults.materialIndex; // <-- We also need to manually set the material of the coal, otherwise it will not look visually different.
    result.decalTypeIndex = defaults.decalGroupIndex;
    result.pathDifficultyIndex = defaults.pathDifficultyIndex;

    variations[result.variationCount++] = terrainVariation_coal;

    return result;
}
```

Rebuild your project. If you are using cmake, use `cmake --build build/`. Create a new world and enable the hammerstone mod as well as your mod. If everything turns out okay, your world should look like the one in the image.

![](/images/tutorials/coal_world.png)

Amazing, right!? Now all we need to do is to randomize its generation instead of overriding all surfaces. You can use the `noiseLoc` argument which is a random number generated by the Perlin noise algorithm to do your randomization with. Also interesting are the `baseAltitude`, `steepness` and `riverDistance` arguments to know how high up you are, what the angle is of the current position, and how far away you are from the nearest river.

I based the coal generation on the limestone and clay generation from the game's source code, and came up with this (add this as the body of the function):

```c
{
    SPSurfaceTypeResult result = incomingType;


    SPVec3 scaledNoiseLoc = spVec3Mul(noiseLoc, 45999.0);
	double noiseValue = spNoiseGet(threadState->spNoise1, scaledNoiseLoc, 2);

	SPVec3 scaledNoiseLocSmallScale = spVec3Mul(noiseLoc, 834567.0);
	double noiseValueSmall = spNoiseGet(threadState->spNoise1, scaledNoiseLocSmallScale, 2);

    SPVec3 scaledNoiseMedScale = spVec3Mul(noiseLoc, 92273.0);
    double noiseValueMed = spNoiseGet(threadState->spNoise1, scaledNoiseMedScale, 2);

    SPVec3 scaledNoiseLocLargeScale = spVec3Mul(noiseLoc, 8073.0);
	double noiseValueLarge = spNoiseGet(threadState->spNoise1, scaledNoiseLocLargeScale, 2);

    bool hasCoal = (noiseValueMed > 0.2 && noiseValue < 0.05 + noiseValueSmall * 0.1);

    bool isBeach = ((baseAltitude + noiseValue * 0.00000005 + noiseValueLarge * 0.0000005) < 0.0000001);
    bool isRock = (steepness > 2.0 + noiseValue * 0.5);
    bool isCoal = hasCoal && !isRock && (steepness > 1.8 + noiseValue * 0.7 - (1.0 - riverDistance) * (1.0 - riverDistance) * 0.7);

    if(!isBeach && isCoal) {
        result.surfaceBaseType = terrainBaseType_coal;
		SPSurfaceTypeDefault defaults = threadState->getSurfaceDefaultsForBaseType(threadState, result.surfaceBaseType);
		result.materialIndex = defaults.materialIndex;
		result.decalTypeIndex = defaults.decalGroupIndex;
		result.pathDifficultyIndex = defaults.pathDifficultyIndex;
    }

    if(hasCoal) {
        variations[result.variationCount++] = terrainVariation_coal;
    }
    return result;
}
```

I ensure coal can be randomly generated anywhere in the world, except at beaches and where there is rock. I also increase the chances of its generation at mountain slopes.

## Conclusion
This concludes a first introduction at the C part of the game. This is only one small part of the terrain generation. I encourage you to look at what is documented as well as the source code to find out other interesting functions that modify for example the height or ocean generation of the world to make something interesting and unique.

As always, [visit the Discord](https://discord.gg/WnN8hj2Fyg) in case you're stuck, or something doesn't seem quite right.