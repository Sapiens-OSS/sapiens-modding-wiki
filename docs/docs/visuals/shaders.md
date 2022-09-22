# Shaders

Shaders in Sapiens come in two folders:
 - `glsl` folder contains the raw, uncompiled shaders.
 - `spv` contains the compiled shaders, that the game actually reads

## Modding Shaders

To mod shaders, you simply need to put an asset into your mods `spv` folder, with a name matching one of the games shaders. This shader will be picked up by the game.

## Shader Types

There are two shader types:
 - `frag`: These shaders essentially set the 'color' of the thing being shaded
 - `vert`: These shaders essentially set the 'shape' of the thing being shaded

Dave uses both shader types heavily to create Sapiens.

# Getting Started with GLSL

Before you can realistically ship a shader mod for Sapiens, you will need the ability to write and compile shaders. This tutorial will walk you through those steps.

## Install the VulkanSDK

You can download the VulkanSDK [here](https://vulkan.lunarg.com/sdk/home#windows).

Simply go through the installation wizard like normal.

## Compile your Shader

To compile your shader, you will need to execute your shader using the `glslc.exe` executable, shipped with Vulkan. By default this is located in `C:/VulkanSDK/x.x.xxx.x/Bin/glslc.exe`.

Here is a sample command:

`C:/VulkanSDK/x.x.xxx.x/Bin/glslc.exe my_shader.frag -std=450core -o my_shader.frag.spv`

 - `my_shader.frag` This is the file where your shader
 - `-std=450core` This sets the version, since dave neglected to do so at the top of the shader files
 - `my_shader.frag.spv` This is the file name/location where the output will be placed

## Dependency Management

Shaders in Sapiens often rely on *other shaders*. When compiling, you therefor need to ensure that any dependency `glsl` shaders are also available, in the expected folder structure.

## Compiler Helper

I wrote a little script to make this whole process easier: https://gist.github.com/SirLich/1ada6df219ab9c1d2a92bcdcc4ca4335

To use the script, drop it into your mod folder. Then create your shaders in `glsl` folder, and also create a blank `spv` folder.

When you run the script, it will compile all your `glsl` shaders into `spv` shaders, ensuring that dependencies are satisfied.

# Example

Here is a simple example of Shaders in action, which you can use as a test-case. We will be editing `lookAtTerrainMesh.frag`, since it's very simple.

```c
layout(location = 0) out vec4 data;

layout(location = 0) in float outAnimation;

void main()
{
    // This is the old value, which is a black outline:
    // data = vec4(0.05,0.05,0.05,1.0);

    // This is the new value, which is a red outline
    data = vec4(1 , 0, 0 , 1.0);
}
```

Compile this shader (see above), and place it into `mod/spv/lookAtTerrainMesh.frag.spv`.

When you load into the game, hexegons should show as cyan.


