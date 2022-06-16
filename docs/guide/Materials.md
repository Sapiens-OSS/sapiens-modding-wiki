# Materials

In Sapiens, a material is a group of numbers that work together to create a desired look for a surface.

##Where to find the material file
Materials can be found in `\GameResources\scripts\common\` in the `materials.lua` file.

![](/images/materials/material_parameters.png)

The image above shows the material parameters for the material used on the bark of an Apple Tree. It may look daunting, but don't worry. After reading this article you should understand it entirely. Here's what each number means:

![](/images/materials/material_parameters_explained.png)

## Material Name
You can name this whatever you want, but it's best to name it something that is easily recognisable and lets you know what it is at a glance. Not visible in game.

## Red, Green and Blue
These work together to decide the colour of the material. RGB is a commonly used colour system on computers. 0 means none of that colour, and 1.0 means as much of that colour as possible. Imagine it as a percentage system, where 0 is 0%, 0.5 is 50% and 1 is 100%. You can use any number in between 0 and 1, of course. For example: If you were to put red and green at 1.0 and Blue at 0, the game would combine red and green to make yellow. Any colour can be made by combining these three colours.

## Roughness
Decides how diffused the light hitting your surface is. 0 means that all light hits the surface perfectly and 1 means that the surface will have imperfections. Roughness can go above 1, but I'm not sure how high.

(If someone has a better explanation please add it, I'm honestly not too sure on that one)

## Metalicity
Decides how metallic your surface is. 0 means no reflections, 1 means it is perfectly metallic and will reflect light like a mirror, like in the image on this page.

## Notes
It's possible to use variables with number values in place of manually writing numbers.

# Adding a material to a model

• Open a model in Blender
![](/images/materials/alpaca_in_blender.png)
• Go to the materials tab
![](/images/materials/materials_tab.png)
• Change material names to the names of the desired materials in materials.lua (Case Sensitive!) or create a material and do the same. Make sure there is no ".001" (or any other number) at the end.
![](/images/materials/material_Names.png)

In Blender's edit mode, selecting faces will allow you to manually assign materials to specific faces in the materials tab. This allows you to choose which material goes where. It does not matter how you make the material look in Blender, in Sapiens it will be overridden by the material values in materials.lua.
