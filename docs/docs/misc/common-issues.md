# Common Issues

This page covers a few common issues that you may face, when developing mods for Sapiens.

## Copy/Pasting Files

Sapiens modding requires a special kind of coding style called [shadowing](/guide/shadowing). This is *required*. If you just copy/paste source files into your mod and edit them, they won't have any effect at all!

## Running Server logic on App Mods

There are two [mod types](/docs/engine/mod-types) in Sapiens: app mods and world mods. You must be aware of the limitation that doesn't allow App Mods to operate on the server thread. If you need the server thread, make a world mod instead.

## Confusing `module.function()` with `module:function()`

In lua, you define a module like `local foo = {}`. Functions can then be defined like:

```lua
function foo:bar(arg1)
	...
end
```

This is a shorthand for the longer form (don't use this except for shadows)

```lua
foo.bar = function(self, arg1)
	...
end
```

As you can see, there is a mysterious 'self' argument getting passed around when using the `:` syntax. This roughly represents the current object (?).

Now imagine that you've defined a function as in the first example, and then attempted to call it like this:

```lua
local value = foo.bar('baz')
```

This would be incorrect, since you've essentially put 'baz' for 'self' and 'nil' for 'arg1'. The correct way to call it would be `local value = foo:bar('baz')`.

## Recursive `mjrequire`

If you have `foo.lua` which requires `bar.lua`, then you can't require `bar.lua` in `foo.lua` because it would cause an infinite loop.

Workarounds:
 - mjrequire inside of Functions
 - rework your architecture
 - pass `bar` as a parameter to `foo` (init function)
