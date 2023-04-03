# Engine Bridges

In Sapiens, many lua classes contain a method called `setBridge` that take a `bridge` parameter. This parameter directly maps to a C++ class inside of the games source code. Every bridge parameter is also unique: No two lua scripts are initialized with the same bridge object.

Because every `bridge` parameter is called `bridge`, and points to C++ code, there isn't any good way of knowing which methods or attributes are available. You should check out the lua source for the class you are using, and look for the methods and attributes you need.

## Example

For example in `server.lua` you can find `function server:setBridge(bridge_)`. 

This bridge maps to a "server" C++ class, which contains various methods, including:
 - `bridge:callClientFunction`
 - `bridge:callClientFunctionForAllClients`
 - `bridge:getSpawnPos`
 - ...

 