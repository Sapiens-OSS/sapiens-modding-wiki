# Object Sets

Object Sets in Sapiens are groupings of objects that are maintained at runtime. All logic related to object sets can be found within
`serverGOM.lua`.

An example object set is `litKilns`, or `temperatureIncreasers`. Objects can be added to object sets at runtime (such as when a kiln is lit), and then
other systems can loop over objects in the set, and perform actions on them.

Helpful methods to work with object sets include:
 - serverGOM:createObjectSet
 - 