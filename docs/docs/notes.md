### GOM
Oh GOM stands for GameObjectManager just in case that isn't obvious. I got sick of typing it everywhere


### Thread Communication
The only supported way to communicate between threads is the callMainThreadFunction/registerMainThreadFunction types of methods. just note too that the lua objects need to be serialized/unserialized when those methods are called, and that can be a performance bottleneck if abused too much

### Call Server Function
you can only pass one arg to callServerFunction. Pass a table if you need more.

all regsitered server functions get given the clientID and arg

### Materials

Black shiny stuff means it cant find a material in material.lua that matches what is specified in the model

### Shadowing and Threading

Basically when the script is loaded, it is run. So when you declare that mod:onLoad function it is the same as saying mod.onLoad = function(self). You can do whatever you like there, and quite a few vanilla scripts do set up various state at that base level. I do kind of try to avoid it though, as you can't assume everything has been fully loaded at that point.

I'm not sure how you plan on structuring this for the multiple threads? buildable:addBuildable will need to be called from all, so if you do it this way without shadowing buildable, or solving it some other way, you'll need to do it in 3 places, instead of one.


