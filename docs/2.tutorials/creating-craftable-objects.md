# Craftable object in Lua

In this tutorial, we will create a small mod that adds charcoal as a craftable object to the game. It is based on a minimal [Coal mod](https://github.com/nmattela/sapiens_coal_mod). This tutorial is written for update 0.3.8. It is possible that this tutorial will not work for future updates.

## Getting started
To get started, follow the [Getting Started with Lua](/guides/lua) guide. This tutorial also uses the [Hammerstone Framework](/hammerstone/introduction) to make your life a bit easier. Optionally, you can also install [Creative Mode](https://github.com/SirLich/sapiens-creative-mode) to make debugging and testing a bit faster.

I assume you have shadowed `scripts/mainThread/controller.lua` and created a directory called `scripts/<yourName>/coal.lua`. In this file, add the following content:
```lua
local coal = {}

function coal:init()
    mj:log("Initializing the Coal mod...")

    mj:log("Coal mod initialized!")
end

return coal
```
That's it! Congratulations, you made your first mod! Just kidding... Obviously your mod doesn't do anything. For that, we will have to shadow a couple more files. If you're unfamiliar with the concept of shadowing, [consult this guide](/guides/shadowing). Also, make sure to have the game's source code open as well to consult. You can find it in `SteamLibrary/steamapps/common/Sapiens/GameResources`. Check Steam settings on what disk your SteamLibrary is located.

## Defining a gameObject

Create the directory `scripts/common`. We will start by adding a charcoal object to the game. We do so by creating the file `scripts/common/gameObject.lua`. Like every other file in `scripts/common`, begin by creating the module, importing some files, and declaring the `onload` function:
```lua
local mod = {
    loadOrder = 1
}

local resource = mjrequire "common/resource" -- <- mjrequire imports files from either the source code, your mod, or from another mod, depending on the hierarchy of mod loads.

local mjm = mjrequire "common/mjm" -- <- mjm contains some functions to work with vectors
local vec3 = mjm.vec3
local mat3Identity = mjm.mat3Identity
local mat3Rotate = mjm.mat3Rotate

function mod:onload(gameObject)

    local super_mjInit = gameObject.mjInit -- <- Store the current value of mjInit in a local variable because we will be overriding it but still need to call it

    gameObject.mjInit = function(self) -- <- mjInit gets called on initialization
        -- Do something --
        super_mjInit(self) -- <- VERY IMPORTANT!!!! DO NOT FORGET TO ALWAYS CALL THE SUPER OR THINGS MAY BREAK!!!
    end


end

return mod -- <- Equally important
```
With this boilerplating done, we can add a gameObject. Put the following code in place of the `-- Do something --` comment in `gameObject.mjInit`:
```lua
gameObject:addGameObject("charcoal", {
    modelName = "charcoal", -- <- This references a model we have yet to define
    name = "charcoal", -- <- Do not do this if you want to support localization with your mod. Check out localization for more info
    plural = "charcoals", -- <- Idem
    scale = 1.0,
    hasPhysics = true,
    resourceTypeIndex = resource.types.charcoal.index, -- <- This references a resource we have yet to define
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
As you can see, there are quite a few parameters to tweak with. These all define the behavior of your gameObject. Go and have some fun and experiment with them a bit (once your code runs of course).

This is already a good start, but as the comments explain, there are some more things we need to do to make this gameObject come to life. Specifically, we still have to define a model and a resource (and other things too).

## Defining a model and a material

In Sapiens, a model is the visual representation of a gameObject (or other kinds of resources). It is stored in the game's files as a `.glb` file, which is a 3D model file that can be created using a program such as Blender.

As I am not talented enough to work with Blender, I am simply going to copy the `models/rock1.glb` file from the game's source code and paste it into my mod directory under `models/charcoal.glb` (you will have to create the `models/` directory first). You can of course create your own model.

We then register this model in `scripts/common/model.lua`:
```lua
local mod = {
    loadOrder = 1
}

function mod:onload(model)

    model.remapModels.dirt.charcoal = {
        dirt = "charcoal"
    }
    
end

return mod
```
It sounds quite random that we have to remap `dirt`, but my two cents is that `dirt` refers to the shape of the item, as all items that fall under this dirt category (rock, clay, etc.) have similar model shapes.

We can define the texture of this model in `scripts/common/material.lua`:
```lua
local mod = {
    loadOrder = 1
}

local mjm = mjrequire "common/mjm"
local vec3 = mjm.vec3

function mod:onload(material)
        mj:insertIndexed(material.types, {
        key = "charcoal",
        color = vec3(0.035,0.027,0.016), -- <-- You can change its color if you'd like
        roughness = 1.1,
        metal = 1.1,
        colorB = vec3(0,0,0),
        roughnessB = 1.1 * 0.9,
        metalB = 1.1
    })
end

return mod
```

## Defining a resource

Sapiens has different types of resources: food, weapons, tools, and other items. These are all referenced in `scripts/resource.lua`. We will have to add our charcoal gameObject to that list. Do so by creating `scripts/resource.lua` in your mod directory, and defining the `mod` module, the function `mod:onload` and some imports like we did before:
```lua
local mod = {
    loadOrder = 1
}

local locale = mjrequire "common/locale"
local typeMaps = mjrequire "common/typeMaps"

function mod:onload(resource)
    local super_mjInit = resource.mjInit -- <- Like before, we store the old mjInit value so we can call it inside our own mjInit
    local gameObjectTypeIndexMap = typeMaps.types.gameObject -- <- We need the gameObject typeMap. typeMaps can be imported using

    -- Do something --
end

return mod
```

In the `onload` function, replace `-- Do something --` with the following code:

```lua
resource.mjInit = function(self)
    super_mjInit(self) -- <- Here, we call the super first instead of last. This is because our charcoal relies on other resources to be loaded in first, such as the campfire.

    resource:addResource("charcoal", { -- <- Here, we will leverage on a Hammerstone functionality to more easily add resources
        name = "charcoal", -- <- Again, do not do this if you want to support localization
        plural = "charcoals", -- <- Idem
        displayGameObjectTypeIndex = gameObjectTypeIndexMap.charcoal -- <- Fetch our gameObject by its ID (charcoal)
    })
end
```

Now, we have added charcoal as a resource. But we would like to tell Sapiens that charcoal can be used as fuel for campfires. For that, we will have to reference this resource in the resourceGroup for campfires. Add this code right after the previous code:
```lua
resource:addResourceGroup("campfireFuel", { -- <- campfireFuel already exists, but we will override it with our own custom implementation
    name = locale:get("resource_group_campfireFuel"), -- <- This is how localization is properly handled
    plural = locale:get("resource_group_campfireFuel_plural"),
    resourceTypes = {
        resource.types.branch.index, -- <- Same as in source code
        resource.types.log.index, -- <- Idem
        resource.types.pineCone.index, -- <- Idem
        resource.types.pineConeBig.index, -- <- Idem
        resource.types.charcoal.index, -- <- This is new
    },
    containsTypesHash = {},
    displayGameObjectTypeIndex = gameObjectTypeIndexMap.birchBranch,
})
```
You can do the same for `kilnFuel` and `torchFuel`, if you'd like.

## Adding to a storage
If you have read the source code for `resource.lua`, you likely have seen this comment: `WHEN ADDING RESOURCE TYPES: Dont forget to add to storage.lua`. That's right, just when you thought everything was complete, we still need to tie some loose ends. Again, create the file `scripts/common/storage.lua`:

```lua
local mod = {
    loadOrder = 1
}


local typeMaps = mjrequire "common/typeMaps"
local resource = mjrequire "common/resource"
local rng = mjrequire "common/randomNumberGenerator"

local mjm = mjrequire "common/mjm"
local vec3 = mjm.vec3
local mat3Rotate = mjm.mat3Rotate
local mat3Identity = mjm.mat3Identity

function mod:onload(storage) -- <- This time, we will not override mjInit. To be honest, I am not certain why, but if you do override mjInit, things will break :/
    -- Do something --
end

return mod
```

Replace `-- Do something --` with:
```lua
storage:addStorage("charcoal", { -- <- Again, we rely on Hammerstone here
    name = "charcoal",
    displayGameObjectTypeIndex = typeMaps.types.gameObject.charcoal, -- <- reference gameObject
    resources = {
        resource.types.charcoal.index, -- <- Reference resource
    },
    storageBox = { -- <- How the gameObject looks like when it is stored
        size =  vec3(0.1, 0.1, 0.1),
        rotationFunction = function(uniqueID, seed)
            local randomValue = rng:valueForUniqueID(uniqueID, seed)
            local rotation = mat3Rotate(mat3Identity, randomValue * 6.282, vec3(0.0,1.0,0.0))
            rotation = mat3Rotate(rotation, randomValue * 6.282, vec3(1.0,0.0,0.0))
            return rotation
        end,
    },
    maxCarryCount = 4, -- <- How much charcoal can a Sapiens carry at a time?
    maxCarryCountLimitedAbility = 2, -- <- Idem but for kids, pregnant women and elderly
    maxCarryCountForRunning = 1, -- <- Idem but when a Sapien is running (e.g. from a mammoth)
    carryType = storage.carryTypes.small,
    carryOffset = vec3(0.0,0.01,0.0),
})
```

Great! Our charcoal has been added to the game! However, it is not yet obtainable because it lacks a crafting recipe. Let's add that.

## Adding a craftable recipe

Charcoal can be crafted in a campfire by using 3 branches which give you 2 charcoal (game balance is beyond the scope of this tutorial). We will describe this in a crafting recipe.

Let's start with the boilerplating again. This time, the boilerplating is a bit larger because we copy/paste some functions and constants from the source code that describe a crafting animation for food, which we will be using for the crafting animation of charcoal (I am lazy and don't know how to animate).

```lua
local mod = {
    loadOrder = 1
}

local mjm = mjrequire "common/mjm"
local vec3 = mjm.vec3
local vec3xMat3 = mjm.vec3xMat3
local mat3Identity = mjm.mat3Identity
local mat3Rotate = mjm.mat3Rotate
local mat3Inverse = mjm.mat3Inverse

local gameObject = mjrequire "common/gameObject"
local constructable = mjrequire "common/constructable"
local actionSequence = mjrequire "common/actionSequence"
local skill = mjrequire "common/skill"
local resource = mjrequire "common/resource"
local craftAreaGroup = mjrequire "common/craftAreaGroup"

-- Begin copy/paste from source code --
local cookingStickRotationOffset = mat3Inverse(mat3Rotate(mat3Identity, math.pi * 0.25, vec3(0.0,1.0,0.0))) -- <- We use the same animation as cooking food because I am lazy and don't know how to animate stuff
local cookingStickRotation = mat3Rotate(mat3Identity, -math.pi + math.pi * 0.25, vec3(0.0,1.0,0.0))

local actionSequenceRepeatCountSlowerCompletion = 7
local function createStandardBuildSequence(actionSequenceTypeIndex, requiredToolIndex, repeatCountOrNil) -- <- Step-by-step explanation of how the animation goes
    return {
        {
            constructableSequenceTypeIndex = constructable.sequenceTypes.clearIncorrectResources.index,
        },
        {
            constructableSequenceTypeIndex = constructable.sequenceTypes.clearObjects.index
        },
        {
            constructableSequenceTypeIndex = constructable.sequenceTypes.bringResources.index,
        },
        {
            constructableSequenceTypeIndex = constructable.sequenceTypes.bringTools.index,
        },
        {
            constructableSequenceTypeIndex = constructable.sequenceTypes.moveComponents.index,
        },
        {
            constructableSequenceTypeIndex = constructable.sequenceTypes.actionSequence.index,
            actionSequenceTypeIndex = actionSequenceTypeIndex,
            requiredToolIndex = requiredToolIndex,
            disallowCompletionWithoutSkill = true,
            repeatCount = repeatCountOrNil or actionSequenceRepeatCountSlowerCompletion,
        },
    }
end
-- End copy/paste from source code --

function mod:onload(craftable)

    super_load = craftable.load -- <- We will now be overriding load instead of mjInit. Again, not sure why

    -- Do something --
    
end

return mod
```

Then, replace `-- Do something --` with:
```lua
craftable.load = function(self, gameObject, flora)
        
    super_load(self, gameObject, flora) -- <- Call the super first

    constructable:addConstructable("charcoal", {
        name = "charcoal",
        plural = "charcoals",
        summary = "Charcoal is a fuel that lasts longer than branches or logs",
        iconGameObjectType = gameObject.typeIndexMap.charcoal,
        classification = constructable.classifications.craft.index,
        isFoodPreperation = true, -- <- I know it's not, but otherwise we cannot use a campfire to make our charcoal

        outputObjectInfo = { -- <- What the crafting result is. In our case, 2 charcoals
            objectTypesArray = {
                gameObject.typeIndexMap.charcoal,
                gameObject.typeIndexMap.charcoal,
            }
        },
        
        outputDisplayCount = 2,

        buildSequence = createStandardBuildSequence(actionSequence.types.fireStickCook.index, nil),
        inProgressBuildModel = "craftSimple",

        skills = {
            required = skill.types.fireLighting.index, -- <- We require that the Sapien knows fire lighting before it can craft charcoal
        },

        requiredResources = { -- <- The ingredients for the crafting recipe. In our case, 3 branches
            {
                type = resource.types.branch.index,
                count = 3,
            },
        },

        requiredCraftAreaGroups = {
            craftAreaGroup.types.campfire.index, -- <- Only allow charcoal to be crafted at a campfire
        },

        temporaryToolObjectType = gameObject.typeIndexMap.stick, -- <- For animation purposes
        temporaryToolOffset = vec3xMat3(vec3(-0.35,0.0,0.0), cookingStickRotationOffset),
        temporaryToolRotation = cookingStickRotation,
    })
end
```

Voila, the recipe is added.

## Conclusion
This concludes our minimalist mod that creates a charcoal object and its associated model, then adds it as a resource and a storable item, along with a recipe to craft it at a campfire.

You can copy/paste the code, make some modifications, then run Sapiens and create a new world, enabling both this mod as well as the hammerstone framework mod. If it works (likely it will not), then you can click on a branch in a storage area, choose craft, and see the charcoal as one of the crafting options.

### My code does not work
Either you made a change, or I made a typo, either way this is a valuable lesson to learn as you will constantly have to fix annoying bugs.

Fixing bugs is best done by checking the logs. There are two log locations:
- The main Sapiens logs, check these logs if your game crashes before being able to create a world. These can be found at `AppData/roaming/sapiens/` or for Proton users: `/SteamLibrary/steamapps/compatdata/1060230/pfx/drive_c/users/steamuser/AppData/Roaming/majicjungle/sapiens`
- The world logs, check these logs if your game crashes after hitting `create world`. Even if your game does not crash, these logs can still contain useful errors. These can be found at `AppData/roaming/sapiens/players/playerID/worlds/worldID/logs` or for Proton users: `/mnt/LinuxHDD/SteamLibrary/steamapps/compatdata/1060230/pfx/drive_c/users/steamuser/AppData/Roaming/majicjungle/sapiens/players/playerID/worlds/worldID/logs`

Ask for help in the [Discord](https://discord.gg/WnN8hj2Fyg) if you're stuck. Have fun!