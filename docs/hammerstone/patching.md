# Patching

Patching is a powerful way to mod Sapiens. Patching allows you to edit the vanilla scripts before they are loaded into the environment. This means that patches are applied before the regular mods are loaded. Hammerstone helps you with this by introducing patch mods.

### How it works

At the start of scripts, you'll often find a function called "mjrequire" followed by the path of a module. This function first loads the vanilla lua file and then checks if the enabled mods provide a mod file of the same path. Hammerstone intercepts this steps and loads the vanilla lua file as a text file.
It then checks for patch mods matching the same path and does some text editing before returning it to the modManager for it to apply regular mods to.

Everything is done in memory. This means that the original files on the disk are never edited and there is no danger of permanently damaging the game's files.

### When to use patch mods

Patch mods should only be used when regular mods simply don't cut it. A good example would be to override a local function. Hammerstone already provides a way for you to make that function global. You can then create a regular mod to override it as usual.

### When NOT to use patch mods

Patch mods should not be used to add new global functions or variables (unless part of a bigger patch). This can already be done via regular mods.

The reason is that the more patches are applied to one file, the harder it is for other modders to patch it themselves. Their own operations might fail because a patch with a lower patchOrder has removed or renamed what they wanted to patch.

Please be careful and mindful when using patch mods! (Otherwise, have lots of fun and enjoy the power :) )

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
- `skipOnFail` (optional) If true, Hammerstone will move onto the next operation instead of failing the whole patch if the operation fails
- `condition` (optional) A function which receives the fileContent as a parameter and returns a boolean indicating if this operation should be run or not

The rest of the fields will depend on the operation `type`.

Ex:
```lua
operations = {
   --replaces the whole local function "doStuff" with the content of the chunk file at "chunks/newDoStuff.lua"
   [1] = { type = "replace", startAt="local function doStuff(", repl={chunk="newDoStuff"}, endAt="\r\nend" } 
}
```

### Operation Types

Hammerstone provides the following operation types:
- `replace` Equivalent of calling `string.gsub`
    - `pattern` (string+) The pattern to search the file with
    - `repl` (string+) The replacement string
- `replaceAt` Replaces the file content (inclusive) between "startAt" and "endAt"
    - `startAt` (nodes) Where to start looking for the text to replace
    - `endAt` (nodes) (optional) Where to stop looking for the text to replace
    - `repl` (string+) The replacement string
- `replaceBetween` Replaces the file content (exclusive) between "startAt" and "endAt"
    - `startAt` (nodes) Where to start looking for the text to replace
    - `endAt` (nodes) Where to stop looking for the text to replace
    - `repl` (string+) The replacement string
- `removeAt` Removes text from the file content (inclusive) between "startAt" and "endAt"
    - `startAt` (nodes) Where to start looking for the text to remove
    - `endAt` (nodes) (optional) Where to stop looking for the text to remove
- `insertAfter` Inserts text after "after"
    - `after` (nodes) Where to insert the text
    - `string` (string+) The text to insert
- `insertBefore` Inserts text before "before"
    - `before` (nodes) Where to insert the text
    - `string` (string+) The text to insert
- `localVariableToModule` Transform a local variable into part of the module so it can be recalled with moduleName.variableName
    - `moduleName` (string+) The name of the module
    - `variableName` (string+) The name of the variable
- `localFunctionToGlobal` Transform a local function into a global one
    - `moduleName` (string+) The name of the module
    - `variableName` (string+) The name of the variable

Note: When `endAt` is optional, the end of the edit is the end of the file.

### Inclusive vs Exclusive replacements
Inclusive means that the last string at `startAt` and the last string at `endAt` will be included in the replacement. Exclusive means the opposite.

### string+

In order to be as powerful as can be, Hammerstone provides many ways to fill in operation parameters. A string+ can be the following:

- `string` Plain old regular string (or `pattern` in the case of `replace`)
- `function` Receives the fileContent and name of the parameter and returns the value of the parameter
- `sub-table` Must contain the name and value of the argument (no use for now)
- `chunk table` Used to fill the parameter with the content of a chunk
    - `chunk` (string) The name of the chunk. Equivalent to the name of the chunk file without the ".lua" extension
    - `indent` (number) (Optional) Number of times to indent the content of the chunk. 1 indent equals to 4 spaces

### nodes
In order to better search for the right place in the file to start or stop an edit, Hammerstone provide "nodes". They can be the following:

- `string` Hammerstone will search for that string in plain text
- `text table` Contains the following:
    - `text` (string) The text to search for
    - `plain` (boolean) If true, Hammerstone will search with a plain text. If false, it will search with a pattern
- `function` Receives the fileContent and the index to start its search at as parameter. Must return the first and last index of its search result
- `nodes table` Contains a list of nodes. Each node within that list must be either a string, a text table or a function as previously defined.

Nodes are used to pinpoint the location of an edit with better accuracy. Consider the following code:

```lua
local function foo()
    local result = getResult()
    if result then
       doSomething()
    end
end

local function bar()
   local result = getResult()
   if result then
       doSomethingElse()
   end
end
```
  
We would like to replace `getResult()` with `getMyNewResult()` BUT only when it is being called by `bar`. If we search for the string `local result = `, it'll return the location of the first result, which is under `foo`.

This is not what we want. We first want to search for `local function bar()` and THEN search for `local result = `. To tell Hammerstone this, we setup the startAt nodes as such:

```lua
startAt = {
   "local function bar()",
   "local result = "
}
```

The `endAt` node always start their search after the results of `startAt`. This means that it's not necessary to repeat the nodes from `startAt`.

# Hammerstone patches

Hammerstone already patches some files for its own needs in order to better server you :)

Some of these changes are minor, some are massive. By default, a copy of the patched files can be found in Hammerstone's mod folder under "patched" if you ever need to consult them. They are created when Hammerstone patches a module. This means that, for example, if you want to see if a certain UI module has been patched, you must first open up that UI in game so that its file and patch are loaded. 

This file will contain ALL patches applied to the original file. If you only want to see the patches done by Hammerstone unload all other mods.

# Concrete example
To see a concrete example, check Hammerstone's source code and into "actionUI"

Happy Patching!
