# Object Sets

Object Sets in Sapiens are groupings of objects that are maintained at runtime. All logic related to object sets can be found within
`scripts/server/serverGOM.lua`.

An example object set is `litKilns`, or `temperatureIncreasers`. Objects can be added to object sets at runtime (such as when a kiln is lit), and then
other systems can loop over objects in the set, and perform actions on them.

## Creating object sets

To create an object set, hook into `scripts/server/serverGOM.lua` and add a new entry to `serverGOM.objectSets`:
```lua
serverGOM.objectSets.myObjectSet = serverGOM:createObjectSet("myObjectSet"),
```

## Maintaining object sets

Your custom-created object sets must be manually tracked using `addObjectToSet` and `removeObjectFromSet`, on both the `serverGOM` and `clientGOM`. The syntax is as follows:

```lua
-- or serverGOM
clientGOM:addObjectToSet(object, clientGOM.objectSets.myObjectSet)
```