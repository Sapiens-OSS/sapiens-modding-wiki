# UI Manager

UI in Sapiens is fairly complex. The UI manager doesn't help you build UIs, it just helps you manage their state. For example:
 - Giving you mouse control when the UI is active
 - Allowing you to press ESC to close the current UI (coming soon)
 - Preventing OTHER ui from showing on top of your currently active UI (coming soon)

## Requiring
```lua
local uiManager = mjrequire "hammerstone/ui/uiManager"
```

## Using
The uiManager relies on the concept of 'elements'. A view is a place where UI can be put. For example, a `GameElement` covers (almost) the whole screen and captures the mouse.

## Elements

### Action Elements
Action Elements are rendered beside the radial menu that appears when selecting an object in the world. To register an Action Element, call `registerActionElement` on the `uiManager` like this:
```lua
local exampleActionElement = mjrequire "exampleMod/exampleActionElement"
uiManager:registerActionElement(exampleActionElement);
```
The Action Element module should look something like this:
```lua
-- Module setup
local exampleActionElement = {
	-- Required by the UI Manager
	view = nil,

	--  Required by the UI Manager
	name = "Example Action Element"
}

-- Requires
-- Add requires here

-- This function is called automatically from the UI manager
function exampleActionElement:init(viewContainer, gameUI, hubUI, world)
	-- Create a parent container
	self.view = View.new(viewContainer)

    -- Add any button/other UI components here
end

-- Module return
return exampleActionElement
```

### Game Elements
Game Elements are shown nearly fullscreen to the user. To register a Game Elemenet, call `registerGameElement` on the `uiManager` like this:
```lua
local exampleGameElement = mjrequire "exampleMod/exampleGameElement"
uiManager:registerActionElement(exampleGameElement);
```
The Game Element module should look something like this:
```lua
local exampleGameElement = {
    gameUI = nil,
	name = "exampleGameElement",
	view = nil,
}

-- Requires
local mjm = mjrequire "common/mjm"
local vec3 = mjm.vec3
local vec2 = mjm.vec2
-- Add more requires here

-- Local state
local backgroundWidth = 1140
local backgroundHeight = 640
local backgroundSize = vec2(backgroundWidth, backgroundHeight)

-- Called when the UI needs to be generated
function exampleGameElement:init(gameUI)
    self.view = View.new(gameUI.view)
	self.view.size = backgroundSize
	self.view.relativePosition = ViewPosition(MJPositionCenter, MJPositionCenter)
end

-- Called every frame
function exampleGameElement:updateGameElement(gameUI)
	
end

return exampleGameElement
```

### Manage Elements
Manage elements are the pages that open when you press `Esc`. The UI manager allows you to add new buttons to that menu, and automatically sets up all the supporting keybinds and tab logic. A manage element module looks like this:
```lua
local exampleManageElement = {
    name = "exampleManageElement",
	view = nil,
	parent = nil,
	icon = "icon_exampleManageElement",
}

function exampleManageElement:init(contentView)
	-- Do your magic!
end

return exampleManageElement
```

