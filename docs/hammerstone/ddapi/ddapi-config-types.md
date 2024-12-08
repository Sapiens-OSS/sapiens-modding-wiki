# DDAPI Config Types

## Object

Objects are defined within `hammerstone/objects/*.json`.

Schema: `"$schema": "https://raw.githubusercontent.com/Sapiens-OSS/hammerstone-schemas/main/schemas/object.schema.json"`

Example:

```json
{
	"hammerstone:object_definition": {
		"description": {
			"identifier": "apple"
		},
		"components": {
			...
		}
	}
}
```

## Storage

Storages are defined within `hammerstone/storage/*.json`

Schema:

Example:

```json
{
    "hammerstone:storage_definition": {
        "description": {
            "identifier": "apple_storage"
        },
        "components": {
            ...
        }
    }
}
```

## Shared Config

Shared configs are files that define lots of small definitions. You can split them into multiple files, or combine them.

Shared configs are defined within `hammerstone/shared/*.json`

Example:

```json
{
    "hammerstone:global_definitions": {
		"hs_seat_types": [
			...
		],
		"hs_model_remaps": [
			...
		],
		"hs_materials": [
			...
		]
	}
}
```

## Builders

Builders are lua-only files defined in `hammerstone/builders/*.lua`. They are explained further in [lua builders.](./ddapi-lua-builders.md)
