# Thread Management

Sapiens uses multiple threads to manage tasks. These threads are more or less reflected in the folder structure of the Lua code. For example, code nested within `server` will only be executed on the server, and so forth.

## Threads

Here is a quick explanation of all threads.

### mainThread

The `mainThread` is essentially the client.

### server

The `server` thread runs the client-agnostic logic. It may help to think of Sapiens is a multiplayer game, where multiple clients can attach to the same server.

For example, if a client digs out a section of the world, this will need to be communicated to all clients. This will be done via the server.

## Thread Communication

Sapiens has an RPC-like structure for elevating client calls to the server, and for server calls to be multicast to the clients.

:::warning
You can only send one param at once! Use a table if you must process multiple pieces of information at once.
:::

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