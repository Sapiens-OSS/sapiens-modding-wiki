# Game Saves

::tip
We recommend you use Hammerstone for managing state. You can find the Hammerstone docs [here](/hammerstone/save-state.md)
::

## Step by Step

Get bridge from `world.lua` `world:setBridge`

Then you can use `clientWorldSettingsDatabase = bridge.clientWorldSettingsDatabase`

Now methods are:
 - clientWorldSettingsDatabase:dataForKey("hasCheckedForTutorialSkip")
 - clientWorldSettingsDatabase:setDataForKey(true, "hasCheckedForTutorialSkip")

## Explanation

In Sapiens, there are a few different databases, which allow you to store different things.

::danger{title="Oh no!"}
This wiki page isn't done. But you can help! Click the 'Edit Page' button at the bottom.
::