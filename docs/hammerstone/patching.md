# Patching

Patching is a powerful way to mod Sapiens. Patching allows you to edit the vanilla scripts before they are loaded into the environment. This means that patches are applied before the regular mods are loaded. Hammerstone helps you with this by introducing patch mods.

### How it works

At the start of scripts, you'll often find a function called "mjrequire" followed by the path of a module. This function first loads the vanilla lua file and then checks if the enabled mods provide a mod file of the same path. Hammerstone intercepts this steps and loads the vanilla lua file as a text file.
It then checks for patch mods matching the same path and does some text editing before returning it to the modManager for it to apply regular mods to.

Everything is done in memory. This means that the original files on the disk are never edited and there is no danger of permanently damaging the game's files.

### When to use patch mods

Patch mods should only be used when regular mods simply don't cut it. A good example would be to override a local function. Hammerstone already provides a way for you to make that function global. You can then create a regular mod to override it as usual.

# Creating patch mods

To create a patch mod, create a "patches" folder at the root of your mod folder. Then, create a lua file matching the same path as the "script" file you want to patch as you would with regular script mods.
For example, if you want to patch the game file "server/planManager.lua", your patch would be at "modFolder/patches/server/planManager.lua"

Inside this file, return the following information:

```lua
local patch = {
	version = "0.4.2.5", --for future use. The version of the game the patch was made for
  patchOrder = 1, -- same as "loadOrder" in regular mods. Indicates the priority of the patch vs other patches
  debugCopyBefore = false, -- if true, Hammerstone will save a "before" copy of the file at the same location as your patch mod file. This could be useful in case an other patch mod modified the file before you did
	debugCopyAfter = true, -- if true, Hammerstone will save an "after" copy of the file so you can see your edits
	debugOnly = false, --if true, Hammerstone will patch the file but won't load it into the environment. Use this in combinaison with "debugCopyAfter" while you're working on your patch
	operations = {} -- see "Operations"
}

return patch
```

## Chunk Files
If you have a lot of code to insert or replace, typing one long multiline string just isn't manageable. For this purpose, you can create separate lua files containing all that neat code and place it in "modFolder/chunks".
The name of the file without the extension will become the name of the chunk.

# Operations

Operations are the "edits" you want to make to the original lua file. Hammerstone will run each operation sequentially. If an operation fails, unless it is allowed to fail, the whole patch will be abandonned and the original file will remain as is. 
An operation can either be a table or a function.

## Function operations

This function only receives one parameter: the content of the file as it is currently patched. This function must return two things: the new patched file string and a success indicator.
Ex:
```lua
operations = {
   [1] = function(fileContent)
            fileContent, count = fileContent:gsub("variableName", "newVariableName")
            return fileContent, count ~= 0
         end
}
```

## Table operations

Table operations are a clean and short way to write edits. By default, all table operations will contain these fields:
- `type` The type of operation (see Operation Types below)
- `skipOnFail` (optional) If true, Hammerstone will move onto the next operation instead of failing the whole patch
- `condition` (optional) A function which receives the fileContent as a parameter and returns a boolean indicating if this operation should be run or not

The rest of the fields will depend on the operation `type`.

Ex:
```lua
operation = {
   --replaces the whole local function "doStuff" with the content of the chunk file at "chunks/newDoStuff.lua"
   [1] = { type = "replace", startAt="local function doStuff(", repl={chunk="newDoStuff"}, endAt="\r\nend" } 
}
```

### Operation Types
