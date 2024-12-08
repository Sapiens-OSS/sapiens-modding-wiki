# Hammerstone Data-Driven-API

The 'DDAPI' is a data-driven API for creating Hammerstone mods: rather than working with the games code directly, you're instead authoring a "config" format which Hammerstone interprets.

## Config Types

Writing config files can be done in two formats: Lua and JSON. Both are fully supported, yet come with some unique trade-offs. Unless stated otherwise, DDAPI examples use the JSON format.

### JSON

JSON is the default config format, and the first format that Hammerstone supported. All examples will use JSON. JSON is good when you want to do something simple, and want maximum editor help in defining the config files. A json schema is available, so you can get autocomplete in your editor of choice (e.g., VSCode).

### Lua

Lua configs were added later, when it became clear that JSON configs aren't suitable for all use-cases. Namely, in complex scenarios where you want to write lua code inline as part of the configs. For example, generating multiple items from the same bit of code, or doing some inline maths calculations.

Lua is best suited when you know what you're doing, or you're trying to accomplish something very unique.

## Philosophy

In the base game of Sapiens, the data and logic for a "feature" is often spread across multiple files. For example, to create an apple, you might need the following:

- `gameObject.lua` - Define the apple object
- `resource.lua` - Give it a 'resource' definition for storage/crafting
- `evolvingObject.lua` - Allow the apple to 'rot' away, or into a rotten variant
- `storage.lua` - Allow the apple to be carried and stored in storage areas
- ... and more!

With Hammerstone, we reverse this relationship. We believe you should be able to define your data in a single place, with a well-defined API. To create
an apple in Hammerstone, you would only need to create `apple.json`.

Inside this apple file, you define "components" describing the apple. For example, this component allows the apple to 'rot' into a rotten apple after some time:

```json
"hs_evolving_object": {
	"min_time": "5",
	"category": "rot",
	"transform_to": [
		"rotten_apple"
	]
}
```

# Getting Started with DDAPI

To get started, you need a live copy of Hammerstone, and a text editor like VSCode. Then create a folder structure like this:

```
mod-name
	modInfo.lua
	hammerstone
		objects
			my_object.json
```

Read further in the [DDAPI Object Guide](./ddapi-objects.md)
