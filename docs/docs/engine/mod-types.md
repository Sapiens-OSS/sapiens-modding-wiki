# Mod Types

Sapiens modding has two mod types: world mods, and app mods. There is a also a third 'mod type' called direct editing.

### World Mods

World mods are what you usually expected from mods. They need to be enabled per-world, and are only loaded when you load a world with them enabled. Typically, you will create a world mod.

Once a world is created, it's not possible to add or remove mods via the in-game UI. To get around this limitation, you can manually edit the `enabledMods` field inside of the worlds folder `config.xml`.

## App Mods

App mods are installed to the game's mods folder, and apply to all worlds as well as the home menu.

Because App Mods are *client side only*, they cannot access the server. This means that many mods are not possible with an app mod.

You should generally only create app mods when required. Localization mods are a good example. 

## Direct Editing

Alongside officially supported mod types, you can also 'mod' sapiens by editing the files in your installation folder. This is commonly used to quickly adjust constant values, like how often Sapiens have babies, or how quickly time passes. 

Direct edits are a powerful tool for experimentation, and can also often be a good 'gateway drug' to more sustainable modding techniques! With that said, they also come with some severe downsides:
 1. The edits are cleared everytime Sapiens is updated
 2. Direct edits have a huge chance to break other mods, since they aren't following the system of shadows
 3. Direct edits cannot easily be packaged up and shared with other people





