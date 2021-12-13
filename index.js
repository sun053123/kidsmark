// const { ApolloServer } = require('apollo-server');

const { PubSub } = require('graphql-subscriptions');
const gql = require('graphql-tag');
const mongoose = require('mongoose');



const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const socketServer = require('./socket.js');
import("reflect-metadata")

// const pubsub = new PubSub();

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => ({ req, pubsub }) //protected route post token
// });

//     mongoose.connect(MONGODB, { useNewUrlParser: true })
//     .then(() => {
//         console.log('MongoDB Connected');
//         return server.listen({ port: 5000})
//     })
//     .then(res => {
//         console.log(`Server running at ${res.url}`);
// });


const { ApolloServer } = require('apollo-server-express');
const socketIO = require('socket.io')
const express = require('express')
const http = require("http");


const pubsub = new PubSub();


let apolloServer = null;

async function startServer() {

    await mongoose.connect(MONGODB, { useNewUrlParser: true })

    const app = express()

    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req, pubsub })
    });

    const httpserver = http.createServer(app);

    const io = require("socket.io")(httpserver, { cors: { origin: "*" } });
    io.on('connection', (socket) => {

        // let numberOfUsersInRoom = getUsersInRoom(payload.room).length

        // const { error, newUser} = addUser({
        //     id: socket.id,
        //     name: numberOfUsersInRoom===0 ? 'Player 1' : 'Player 2',
        //     room: payload.room
        // })

        console.log("User Connected");

        socket.on("joinRoom", (roomCode) => {
            console.log(`A user joined the room ${roomCode}`);
            socket.join(roomCode);
        });

        socket.on("play", ({ id, roomCode }) => {
            console.log(`play at ${id} to ${roomCode}`);
            socket.broadcast.to(roomCode).emit("updateGame", id);
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected");
        });
    })

    // httpserver.listen(5001, () =>
    //     console.log("server running => http://localhost:5001")
    // );


    app.get("/rest", function (req, res) {
        res.json({ data: "api working" });
    });



    httpserver.listen(5000, function () {
        console.log(`server running on port 5000`);
        console.log(`gql path is ${apolloServer.graphqlPath}`);
    });


    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}



startServer();


