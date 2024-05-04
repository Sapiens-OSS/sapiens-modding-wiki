# Shaders

Shaders in Sapiens come in two folders:

- `glsl` folder contains the raw, uncompiled shaders.
- `spv` contains the compiled versions.

## Shader types

There are two shader types:

- `frag`: These shaders essentially set the 'color' of the thing being shaded
- `vert`: These shaders essentially set the 'shape' of the thing being shaded

## Creating shaders

To mod shaders, you simply need to put a compiled shader into the `spv` folder at the root of your mod directory (create it if it doesn't exist). The name must match one of the games shaders. This shader will be picked up by the game.

## Getting Started with GLSL

Before you can build a shader mod for Sapiens, you will need the ability to write and compile shaders. This tutorial will help you set up your development environment.

::: tip This tutorial is for Windows
Unfortunately, we have not written guides for Linux or Mac users.
:::

### Install the VulkanSDK

You can download the VulkanSDK [here](https://vulkan.lunarg.com/sdk/home#windows).

### Compile your Shader

To compile your shader, you will need to execute your shader using the `glslc.exe` executable, shipped with Vulkan. By default this is located in `C:/VulkanSDK/x.x.xxx.x/Bin/glslc.exe`.

Here is a sample command:

`C:/VulkanSDK/x.x.xxx.x/Bin/glslc.exe my_shader.frag -std=450core -o my_shader.frag.spv`

- `my_shader.frag` This is the file where your shader
- `-std=450core` This sets the version, since dave neglected to do so at the top of the shader files
- `my_shader.frag.spv` This is the file name/location where the output will be placed

### Dependency Management

Shaders in Sapiens often rely on _other shaders_. When compiling, you therefor need to ensure that any dependency `glsl` shaders are also available, in the expected folder structure.

## Compiler Helper

There is a Python script available to streamline the shader compilation process: [SirLich's Sapiens Shader Compiler](https://gist.github.com/SirLich/1ada6df219ab9c1d2a92bcdcc4ca4335).

To use the script, drop it into your mod folder. Then create your shaders in `glsl` folder, and also create a blank `spv` folder.

When you run the script, it will compile all your `glsl` shaders into `spv` shaders, ensuring that dependencies are satisfied.

## Example

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

Compile this shader (see above), and place it into `/spv/lookAtTerrainMesh.frag.spv`.

When you load into the game, the hexagons should show as cyan.
