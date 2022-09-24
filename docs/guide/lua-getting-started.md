# Getting Started with Lua

Hey, and welcome to the Sapiens Modding Wiki! Please note that this guide _only_ covers modding in Sapiens, not Lua or the basics of asset creation.

## Software and Installation

To get started modding Sapiens you should install a suitable code editor. We suggest [Visual Studio Code](https://code.visualstudio.com/) from Microsoft to get started. Additionally, install the [Lua](https://marketplace.visualstudio.com/items?itemName=yinfei.luahelper) plugin and use [this](https://cdn.discordapp.com/attachments/983298485942112296/997846637449838592/settings.json) config.

## Creating the mod

To create a mod, create a folder in one of these locations:

- Windows (offical platform): `C:\Users\[user_name]\AppData\Roaming\majicjungle\sapiens\mods\`
- Proton (unoffical): `~/.steam/steam/steamapps/compatdata/1060230/pfx/drive_c/users/steamuser/AppData/Roaming/majicjungle/sapiens/mods/`

Next, create a `modInfo.lua`. This contains most of the important information about your mod. Example `modInfo.lua`, copy and change as necessary:

```lua
local modInfo = {
  name = "My Example Mod Name",
  description = "A super-duper groovy mod that does... stuff",
  type = "", -- We'll get back to this
  developer = "Me"
}
return modInfo
```

Here is a full list of modInfo parameters (optional):

```lua
local modInfo = {
    name = "My Example Mod Name",
    description = "A super-duper groovy mod that does... stuff",
    preview = "preview.jpg",
    version = "0.0.1",
    type = "app",
    developer = "Me",
    website = "https://sirlich.github.io/sapiens-modding-wiki/",
}
return modInfo
```

### Mod Types

As you can see above, we have yet to fill the `type` parameter of our `modInfo.lua`. This is because it changes depending on the type of mod we want to make.

- **World** mods are the 'standard' type of mod. They are run both on the client and the server, and are very useful when trying to add any sort of content.
- **App** mods are mods that affect the whole game. They are run on the client, and are useful for things like [Localization](https://github.com/Majic-Jungle/sapiens-mod-creation/wiki/Localizations#creating-a-translation-mod)

Depending on the type of mod you'd like to create, `type` is either `world` (for World mods) or `app` (for App mods).

## What to do from here?

This guide just sets up a mod for you, nothing more. To make the game do what you want to do, look over on the sidebar and read up on how it works before trying to implement it. Some topics I suggest checking out:

- [Shadowing](/guide/shadowing.md) - Further your knowledge on how shadowing works so you don't run into weird issues later.
- [Mod Types](/docs/scripting/mod-types) - Understand what each type of mod does and how to develop them properly.
- [Hammerstone Framework](/hammerstone/introduction) - Hammerstone Framework is a library that's designed to help modders and provide a level of 'protection' from the Sapiens codebase.
