# Thread Management

Sapiens uses multiple threads to manage tasks. These threads are more or less reflected in the folder structure of the Lua code. For example, code nested within `server` will only be executed on the server, and so forth.

::info
Although Sapiens is currently singleplayer, the actual game is programmed as a multiplayer experience, where the server thread is intended to run on a dedicated server box, with clients connecting.
::

## Available Threads

Here is a quick explanation of all threads.

### mainThread

The `mainThread` does the rendering, handles UI, player movement, anything that needs immediate feedback to the user. You can think of the `mainThread` as the client.

### logicThread

The `logicThread` is a secondary client-side thread, which handles handles everything else on the client, generating terrain, updating buffers for rendering, updating animations, communications with the server.

### server

The `server` thread runs the client-agnostic logic. It may help to think of Sapiens is a multiplayer game, where multiple clients can attach to the same server.

For example, if a client digs out a section of the world, this will need to be communicated to all clients. This will be done via the server.

### Common Folder

The 'common' folder in Sapiens contains a collection of files that can be accessed from multiple threads.

### misc. Threads

Alongside these main threads, there is also a host of other threads, doing various small tasks. These can range from world generation, to pathfinding, to particle rendering.

## Thread Communication

Sapiens has an RPC-like structure for elevating client calls to the server, and for server calls to be multicast to the clients. The only supported way to communicate between threads is the callMainThreadFunction/registerMainThreadFunction types of methods.

::warning
You can only send one param at once! Use a table if you must process multiple pieces of information at once.
::

### Client to Server

To communicate for the client to the server, you will need to register a new net function (at startup), then call it.

 - `server:registerNetFunction` can be called on the `server` to make a server function available to the `mainThread`.
 - `logicInterface:callServerFunction` can be called on the `mainThread` to fire a function on the `server`, assuming `registerNetFunction` is setup.

### Server to Client

To communicate from the Server to the Client, you will need to do a bit of setup. Unless I am mistaken, the path is: Server -> Logic -> MainThread

 - `logic:registerLogicThreadNetFunction` can be used to register a `logic` thread function as callable on the server.
 - `logicInterface:registerMainThreadFunction` can be used to register a `mainThread` function as callable on the logic thread.

And then finally, you can use:
 - `server:callClientFunction` can be called on the `server` to propagate a server call to the `mainThread`, via the `logic` thread.

::warning
Lua objects need to be serialized/unserialized when those methods are called, and that can be a performance bottleneck if abused too much
::