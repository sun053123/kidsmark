const { SocketController, ConnectedSocket, OnConnect, SocketIO }  = require("socket-controllers")
const { Socket, Server } = require("socket.io")

@SocketController
class MainController{

    @OnConnection
    onConnection(@ConnectedSocket() Socket, @SocketIO() Server){
        console.log(`new socket connectted ${socket.id} ` )

    }
}