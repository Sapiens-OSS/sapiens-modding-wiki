# Materials

Materials control how surfaces look on models, and are assigned via names. Sapiens' materials can be found in `scripts/common`, in the `materials.lua` file.

## How do they work?
`mat("appleBark", vec3(0.22,0.2,0.16) * 0.2, 1.0),`

The image above shows the material parameters for the material used on the bark of an Apple Tree. It may look daunting, but don't worry. After reading this article you should understand it entirely. Here's what each number means:

![](/images/materials/material_parameters_explained.webp)

### Material Name
You can name this whatever you want, but it's best to name it something that is easily recognisable and lets you know what it is at a glance. It's not shown in-game.

### Red, Green and Blue
These work together to decide the colour of the material. RGB is the most commonly used colour system on computers. 0 means none of a particular colour, and 1.0 means as much of that colour as possible.

It's easiest to think of it as a percentage system, where 0 is 0%, 0.5 is 50% and 1 is 100%. You can use any number in between 0 and 1, of course. For example, if you put red and green at 1.0, and then blue at 0, the game would combine red and green to make yellow. Any colour can be made by combining these three colours.

There are thousands of good colour pickers on the internet. You can use [this one](https://rgbcolorpicker.com/0-1) if you don't want to look.

::: tip
Most RGB pickers use colours from 0 to 255. Simply divide each value by 255 to get the 0-1 range that Sapiens uses. 
:::

### Roughness
The roughness of a surface determines how mirror-like it is. A value of 0 will have perfect reflections (a cubemap approximation) and a value of 1 will be perfectly matte. Values in between will be a mix of the two, for example 0.5 will be like plastic with blurry highlights.

### Metalicity
Metallic objects tint reflections. With a value of 0, any reflected objects will be their actual colour in the reflection. With a value of 1, reflections will take on the colour of the surface.

## Adding a material to a model

1. Open a model in Blender:

![](/images/materials/alpaca_in_blender.webp)

2. Go to the 'materials' tab:

![](/images/materials/materials_tab.webp)

3. Change material names to the names of the desired materials in `materials.lua` (case sensitive), or create a material and do the same. Make sure there is no ".001" (or any other number) at the end (the names have to be identical).

![](/images/materials/material_names.webp)

4. In Blender's edit mode, selecting faces will allow you to manually assign materials to specific faces in the materials tab. This allows you to choose which material goes where. It does not matter how you make the material look in Blender, in Sapiens it will be overridden by the material values in materials.lua.

::: warning
If your material is black and shiny, it means material.lua does not have a material that matches the material name specified in the model.
:::
