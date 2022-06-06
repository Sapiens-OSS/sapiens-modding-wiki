# Timers

Timers in lua can be used to schedule events in the future:

```lua
local timer = mjrequire "common/timer"
```

```lua
timer:addCallbackTimer(delay * 0.25, function()
	slideOn(subMenu)
end)
```
