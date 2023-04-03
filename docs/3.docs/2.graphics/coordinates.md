# Coordinates

In Sapiens, there are three coordinate systems: The first is used during world generation (pre-render), the second is used for rendering (render), and the third is used during normal gameplay (meters).

## Prerender Scale

The world is a unit sphere, where sea level is `1.0` radius. The north pole is `0.0, 1.0, 00`. In pre-render, the coordinates are just 3D positions in that space.

## Render Scale

The render scale is similar to pre-render, except that it's `100,000` times larger. The significance of this scale is unknown.

Alongside having it's own scale, the render coordinate systems is relative to a shifting origin point. This prevents floating point insanity, no matter where you are on such a large planet.

## Meter Scale

The meter scale is used during normal gameplay. Each side of a hex in sapiens is roughly 2 meters (although be aware of pole-distortion).

## Conversions and Constants

The `mj` module contains a few methods for converting back and forth between the three coordinate systems. Here is a cleaned up version of the code:

```lua

local RENDER_SCALE = 100000.0
local WORLD_SIZE = 8388608.0

function mj:mToP(meters)
	--- Converts meters to pre-render coordinates.
	return (meters / WORLD_SIZE)
end

function mj:mToR(meters)
	--- Converts meters to render coordinates.
	return (meters * mj.RENDER_SCALE / WORLD_SIZE)
end

function mj:rToM(render)
	--- Converts render coordinates to meters.
	return (render * WORLD_SIZE / mj.RENDER_SCALE)
end

function mj:pToM(prerender)
	--- Converts pre-render coordinates to meters.
	return (prerender * WORLD_SIZE)
end
```
