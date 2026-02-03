# Getting Started with VSCode

The Sapiens VSCode extension generates full Sapiens starter projects within VSCode, and gets you ready to write Lua, C and localization (or a combination of them) mods with. It uses the wonderful [Sapiens cmake template by suppergerrie2](https://github.com/Sapiens-OSS/sapiens-cmake-template).

## Prerequisites

The VSCode extension and cmake template have been tested on Windows and Linux.

Please ensure you have the following installed on your system:

- [Git](https://git-scm.com/)
- [CMake](https://cmake.org/)
  - **Windows** users should additionally install [Visual C++ Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2019)
  - **Linux** users should additionally install [mingw-w64-cmake](https://aur.archlinux.org/packages/mingw-w64-cmake)
  - **Mac** users _may_ need to `brew install cmake`
- [Visual Studio Code](https://code.visualstudio.com/)
- [Sapiens VSCode Extension](https://marketplace.visualstudio.com/items?itemName=Sapiens-OSS.sapiens-vscode-extension)

Ensure that `steam` is a recognized command on your system. If not, edit your PATH system environment variable to point to your Steam binary.

::: tip
On **Windows**, your Steam binary is likely located at `C:\Program Files (x86)\Steam`, which is not by default in your PATH.
:::

Please take note of your Sapiens installation's mod directory:

- For **Windows** users, this is by default installed at `%AppData%\majicjungle\sapiens\mods`.
- For **Mac** users, this is by default installed at `~/Library/Application Support/majicjungle/sapiens/mods`
- For **Linux** users, it is located within your Proton compatibility layer prefix. To get there:
  1. Find your Sapiens installation directory. Typically, it's at `~/.steam/steam/steamapps/common/Sapiens`
  2. Navigate further to `../../compatdata/1060230/pfx/drive_c/users/steamuser/AppData/Roaming/majicjungle/sapiens/mods/`.
  3. Take note of the `mods` folder's absolute path. If you're using the GNOME 'Files' app/Nautilus, you can use `Ctrl+L` to select the absolute path.

Please also take note of your `GameResources` folder if you have changed the default installation directory (i.e. on an external drive):

1. Open Steam.
2. Go to Sapiens.
3. Click on the gear on the right > Properties...
4. Click on local files > Browse...
5. You are now on the path where Sapiens files are located.
6. Navigate further to `GameResources/`.
7. Take note of the `GameResources` folder's absolute path.

## Instructions

1. Install the Sapiens Modding extension for VSCode in the VSCode marketplace.
   ![Screenshot of VSCode Extension from within VSCode](/images/guide/vscode/instruction_1.webp)
2. Open your VSCode settings, and search for `modPath`. Enter the path to the Sapiens mod folder as you have noted it down in the prerequisite step.
   ![Screenshot of the VSCode Extension modPath configuration](/images/guide/vscode/instruction_2.webp)
3. (If you've changed the default installation directory) Search for `gameResourcesPath` in your VSCode settings. Enter the path to the Sapiens GameResources folder as your have noted it down in the prerequisite step.
   ![Screenshot of the VSCode Extension gameResourcesPath configuration](/images/guide/vscode/instruction_3.webp)
4. Search using Ctrl+Shift+P for 'newProject'. An option to create a new Sapiens mod project will appear.
   ![Screenshot of VSCode command palette with the newProject command searched](/images/guide/vscode/instruction_4.webp)
5. Follow the guide that shows up
   - Enter the directory in which a new directory will be created that contains the project. Something like your 'Dev' or 'Sapiens Mods' directory that contains all your mods, not the actual mod directory.
   - Enter the name of your mod. This is a string in which you are free to type in anything. The string gets converted into a valid cmake ID and folder name, which will be used as name for your project's folder. Whitespaces are converted to dashes, and illegal characters such as any type of bracket are omitted.
   - Enter the description of your mod.
   - Enter the mod type. Choose 'app' if you are making a localization mod. Choose 'world' for any other kind of mod. Read more about the difference [here](/docs/engine/mod-types.md).
   - Enter the name of the developer (you).
   - (Optional) Enter a website.
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
You're all set up, get started with modding!

## Additional Features

### Lua Shadow Snippets

There is a snippet called `lua-shadow` that automatically generates a template for your Lua file that is used to shadow a corresponding vanilla Lua file.

### Open Vanilla Lua File

The `openSourceFile` command (bound to F4) allows you to open the corresponding Vanilla Lua file of the currently opened Lua shadow file. This requires that you set the `gameResourcesPath` setting (see prerequisites).
