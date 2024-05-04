# Logger

The Hammerstone logger allows you to separate your logs into different files, so you're not combing through one massive `mainLog.log`

## Requiring

```lua
local logger = mjrequire "hammerstone/logging"
```

## Using

### `log(...)`

A basic log function that prefixes '[Hammerstone]' to your messages. Used internally.

### `warn(...)`

A basic warn function that prefixes '[Hammerstone]' to your messages. Used internally.

### `error(...)`

A basic error function that prefixes '[Hammerstone]' to your messages. Used internally.

### `schema(logId, ...)`

A logger that prints both to the `mainLog.log` and a separate `hammerstone_logId.log` file to easily locate logs when developing. They sit next to the `mainLog.log` in your world's `log` directory.
