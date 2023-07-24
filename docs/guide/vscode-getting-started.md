# Getting Started in VSCode

A Sapiens VSCode extension is at your disposal in the VSCode extension market that sets up a project for you to write Lua, C (a combination of both) and localization mods with. It uses the wonderful [Sapiens cmake template by suppergerrie2](https://github.com/Sapiens-OSS/sapiens-cmake-template).

## Prerequisites
The VSCode extension and cmake template have been tested on Windows and Linux.

Please ensure you have the following installed on your system:
- [Git](https://git-scm.com/)
- [CMake](https://cmake.org/)
    - **Windows** users should additionally install [Visual C++ Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2019)
    - **Linux** users should additionally install [x86_64-w64-mingw32-cmake](https://aur.archlinux.org/packages/mingw-w64-cmake)
    - **Mac** users _may_ need to `brew install cmake`
- [Visual Studio Code](https://code.visualstudio.com/)
- [Sapiens VSCode Extension](https://marketplace.visualstudio.com/items?itemName=Sapiens-OSS.sapiens-vscode-extension)

Ensure that `steam` is a recognized command on your system. If not, edit your PATH system environment variable to point to your Steam binary.
- On **Windows**, your Steam binary is likely located at `C:\Program Files (x86)`, which is not by default in your PATH.

Please take note of your Sapiens installation's mod directory:
- For **Windows** users, this is by default installed at `%AppData%\majicjungle\sapiens\mods`.
- For **Mac** users, this is by default installed at `~/Library/Application Support/majicjungle/sapiens/mods`
- For **Linux** users, you will need to:
    1. Open Steam.
    2. Go to Sapiens.
    3. Click on the gear on the right > Properties...
    4. Click on local files > Browse...
    5. You are now on the path where Sapiens files are located.
    6. Navigate further to `../../compatdata/1060230/pfx/drive_c/users/steamuser/AppData/Roaming/majicjungle/sapiens/mods/`.
    7. Take note of the `mods` folder's absolute path.

(Optional) Please also take note of your `GameResources` folder:
1. Open Steam.
2. Go to Sapiens.
3. Click on the gear on the right > Properties...
4. Click on local files > Browse...
5. You are now on the path where Sapiens files are located.
6. Navigate further to `GameResources/`.
7. Take note of the `GameResources` folder's absolute path.

## Instructions
1. Install the Sapiens Modding extension for VSCode in the VSCode marketplace.
    ![](/images/guide/vscode/instruction_1.png)
2. Open your VSCode settings, and search for `modPath`. Enter the path to the Sapiens mod folder as you have noted it down in the prerequisite step.
    ![](/images/guide/vscode/instruction_2.png)
3. (Optional) Search for `gameResourcesPath` in your VSCode settings. Enter the path to the Sapiens GameResources folder as your have noted it down in the prerequisite step.
    ![](/images/guide/vscode/instruction_3.png)
4. Search using Ctrl+Shift+P for 'newProject'. An option to create a new Sapiens mod project will appear.
    ![](/images/guide/vscode/instruction_4.png)
5. Follow the guide that shows up
    1. Enter the directory in which a new directory will be created that contains the project.
    ::: info
    This should not be the folder in which you want your project files to be put in. The extension will create a folder in the provided folder in which all project files will appear.
    :::
    2. Enter the name of your mod. This is a string in which you are free to type in anything. The string gets converted into a valid cmake ID and folder name, which will be used as name for your project's folder. Whitespaces are converted to dashes, and illegal characters such as any type of bracket are omitted.
    3. Enter the description of your mod.
    4. Enter the mod type. Choose 'app' if you are making a localization mod. Choose 'world' for any other kind of mod.
    5. Enter the name of the developer (you).
    6. (Optional) Enter a website.
6. Confirm, but double-check the location it will write files to, as well as the mod location where your mod will be copied to when building.

::: tip
Open the Sapiens extension output (Ctrl+\` > OUTPUT > Choose `sapiens-vscode-extension-log` in the dropdown on the right) to follow along with the process. Any errors will be logged there too.
:::

The mod project will open in your current VSCode window.

Details about the mod that you entered were saved in `modInfo.lua`. You can change these any time you want.

::: info
The extension automatically initialized cmake for you by running the command:
```
cmake -DAUTO_COPY_MOD=ON -DSAPIENS_MOD_DIRECTORY="/directory/to/your/sapiens/installation's/mods/folder" . -B build
# Linux users should use x86_64-w64-mingw32-cmake instead of cmake
```

If you ever happen to remove the build folder, wish to change the mod ID, or you changed the Sapiens mod directory, search using Ctrl+Shift+P for `recreateBuild` or press F7.
:::

To build and run the project, search using Ctrl+Shift+P for `buildAndRun` or press F6.

::: info
The `buildAndRun` command runs the following cmake command:

```
cmake --build build/ --target sync_mod_files --target run_game
```
:::

From hereon out, you can follow the other guides to [get started with Lua](/guide/lua-getting-started) or [get started with C](/guide/c-getting-started).

## Additional Features

### Lua Shadow Snippets

There is a snippet called `lua-shadow` that automatically generates a template for your Lua file that is used to shadow a corresponding vanilla Lua file.

### Open Vanilla Lua File

The `openSourceFile` command (bound to F4) allows you to open the corresponding Vanilla Lua file of the currently opened Lua shadow file. This requires that you set the `gameResourcesPath` setting (see prerequisites).