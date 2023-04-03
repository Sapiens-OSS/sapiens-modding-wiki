# Mod Types

Sapiens modding has two mod types: world mods, and app mods. There is a also a third 'mod type' called direct editing.

### World Mods

World mods are your 'standard' mod. They are installed to your system, but only effect the worlds they are enabled in! You should make world mods whenever possible.

From a technical perspective, world mods are copied from your mods folder to the game's world folder when the world is created. This means that when developing a world mod, you must edit it within the world itself (not in the mod folder, since those changes won't be reflected).

Please note that once a world is created, it's not possible to add or remove mods via the in-game UI.

To get around this limitation, you can copy mods into the world folder manually. You must also manually edit the `enabledMods` field inside of the worlds folder `config.xml`.

## App Mods

App mods are installed to the game's mods folder, and apply to all worlds as well as the home menu. Since they are not copied into the world folder, they can be edited in the mod folder directly. 

Because App Mods are *client side only*, they are not enabled on the server thread. This means that many modifications will not be possible with an AppMod.

You should generally only create AppMods in the rare occurrence where you really want to effect the whole game. Localization mods are a good example. 

## Direct Editing

Alongside officially supported mod types, you can also 'mod' sapiens by editing the files in your installation folder. This is commonly used to quickly adjust constant values, like how often Sapiens have babies, or how quickly time passes. 

Direct edits are a powerful tool for experimentation, and can also often be a good 'gateway drug' to more sustainable modding techniques! With that said, they also come with some severe downsides:
 1. The edits are cleared everytime Sapiens is updated
 2. Direct edits have a huge chance to break other mods, since they aren't following the system of shadows
 3. Direct edits cannot easily be packaged up and shared with other people





