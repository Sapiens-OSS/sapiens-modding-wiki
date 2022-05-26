### GOM:
Oh GOM stands for GameObjectManager just in case that isn't obvious. I got sick of typing it everywhere


### Thread Communication
The only supported way to communicate between threads is the callMainThreadFunction/registerMainThreadFunction types of methods. just note too that the lua objects need to be serialized/unserialized when those methods are called, and that can be a performance bottleneck if abused too much

### Call Server Function
you can only pass one arg to callServerFunction. Pass a table if you need more.

all regsitered server functions get given the clientID and arg

