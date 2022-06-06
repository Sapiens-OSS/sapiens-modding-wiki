# Save Games

## Hammerstone

Hammerstone contains a wrapper for saving, [which you can find here](https://github.com/SirLich/hammerstone-framework/blob/master/hammerstone/scripts/hammerstone/state/saveState.lua)

## Step by Step

Get bridge from `world.lua` `world:setBridge`

Then you can use `clientWorldSettingsDatabase = bridge.clientWorldSettingsDatabase`

Now methods are:
 - clientWorldSettingsDatabase:dataForKey("hasCheckedForTutorialSkip")
 - clientWorldSettingsDatabase:setDataForKey(true, "hasCheckedForTutorialSkip")