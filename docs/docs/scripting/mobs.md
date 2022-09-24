# Mobs

Mobs in Sapiens are creatures that are not controlled by a player. In the base game, you can find Chickens, Alpacas, and Mammoths.

## Example Mod

To get started, you can check out the source code in the [Sapiens Sheep](https://github.com/SirLich/sapiens-sheep) example mod. It adds a sheep to the game, while also explaining some of the issues faced in doing so.

**Note:** Dave has since fixed many of these issues, but the example mod has not been updated.

> OK @SirLich  I think I've addressed all of the issues in your Sapiens Sheep Mod notes for beta 8. It now finds any models you add, and clientMob exposes mobClassMap which I think is all you need. I think everything else you mentioned you should be able to get working OK, but let me know how you get on.


## Adding a Mob

Adding a new mob into Sapiens is a little tricky, and requires a number of files, including a few `shadows`:

 - File: `serverMammoth.lua` (server side logic, such as update cycle)
 - Data: `serverGOM.objectSets` (`mammoths = bridge:createObjectSet("mammoths"),`)
 - File: `clientMammoth.lua` (stub?)
 - File: `mobMammoth.lua` (Fundamentally just a wrapper around `mob:addType`)
 - Data `scripts/common/mob.lua` < init `mobMammoth.lua`!
 - Data: `mob.validTypes` (potentially already done for you, depending on how early you add the type)
 - Data: `mobClient.mobClassMap` (local `[mob.types.mammoth.index] = clientMammoth`)
 - Data: `serverMammoth:init(serverGOM, serverWorld, serverMob)` (inside of `serverMob.lua`)


::: danger Oh-no!
This wiki page isn't done. If you know what you're doing, feel free to contribute.
:::