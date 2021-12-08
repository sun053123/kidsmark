// const { ApolloServer } = require('apollo-server');

const { PubSub } = require('graphql-subscriptions');
const gql = require('graphql-tag');
const mongoose = require('mongoose');



const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const socketServer = require('./socket.js');
import ("reflect-metadata")

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

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    
    const httpserver = http.createServer(app);

    app.get("/rest", function (req, res) {
        res.json({ data: "api working" });
    });
    
    app.listen(5000, function () {
        console.log(`server running on port 5000`);
        console.log(`gql path is ${apolloServer.graphqlPath}`);
    });
    
    const io = require("socket.io")(httpserver, { cors: { origin: "*" } });
    io.on('connection', (socket) => {
        console.log("User Connected");
    
      socket.on("joinRoom", (roomCode) => {
        console.log(`A user joined the room ${roomCode}`);
        socket.join(roomCode);
      });
    })
}

startServer();


