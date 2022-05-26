# Save Games

### Step by Step

Get bridge from `world.lua` `world:setBridge`

Then you can use `clientWorldSettingsDatabase = bridge.clientWorldSettingsDatabase`

Now methods are:
 - clientWorldSettingsDatabase:dataForKey("hasCheckedForTutorialSkip")
 - clientWorldSettingsDatabase:setDataForKey(true, "hasCheckedForTutorialSkip")