# Troubleshooting the DDAPI

Modding in Sapiens is error prone, and although Hammerstone improves this in some ways, in other ways it can add more confusion. Also, the DDAPI opens the doors to additional bugs to sneak in!

This section will explain some common issues and their solutions.

## Debug Boolean

Simply set `"debug": true` at the top of your JSON file (per config, not fully standardized), and Hammerstone will print additional information about the object.

## Commonly encountered issues

### Buildable doesn't start Building

If you notice that sapiens will gather the resources for a buildable but not start building it, this could be caused by the "requirements" being ill-matched. For example
the 'tool' or 'skill' being defined in a weird or unexpected way.

### Buildable doesn't Complete

If the buildable is finished, but never "completed", this could be caused by an incorrect 'action_sequence'. For example the sequence created from `createStandardBuildSequence` doesn't work for buildables.

### Object crashes when I click on it

Objects in Sapiens need the "plans" to be added. Resources have their own plans. Harvestables have their own plans. You can also add custom plans. But if you don't do any of this, the object will crash when you click on it.

### Object crashes when a Sapien picks it up

Likely a storage issue.
