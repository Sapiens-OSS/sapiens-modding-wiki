# Adding Mobs

Going to try to compile a definitive list of all places that require editing, if you want to add a new mob:

 - File: `serverMammoth.lua` (server side logic, such as update cycle)
 - Data: `serverGOM.objectSets` (`mammoths = bridge:createObjectSet("mammoths"),`)
 - File: `clientMammoth.lua` (stub?)
 - File: `mobMammoth.lua` (Fundamentally just a wrapper around `mob:addType`)
 - Data `scripts/common/mob.lua` < init `mobMammoth.lua`!
 - Data: `mob.validTypes` (potentially already done for you, depending on how early you add the type)
 - Data: `mobClient.mobClassMap` (local `[mob.types.mammoth.index] = clientMammoth`)
 - Data: `serverMammoth:init(serverGOM, serverWorld, serverMob)` (inside of `serverMob.lua`)

Extra Stuff:
