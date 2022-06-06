# Thread Management

Sapiens uses multiple threads to manage tasks. These threads are more or less reflected in the folder structure of the Lua code. Most importantly, there is a `server` and a `mainThread` (client).

## Communication across Threads

Sapiens has an RPC-like structure for elevating client calls to the server, and for server calls to be multicast to the clients.

 - `server:registerNetFunction` can be called on the `server` to make a server function available to the `mainThread`
 - `server:callClientFunction` can be called on the `server` to propagate a server call to the `mainThread`
 - `logicInterface:callServerFunction` can be called on the `mainThread` to fire a function on the `server`, assuming `registerNetFunction` is setup.