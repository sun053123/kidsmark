const { ApolloServer } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const socketIO = require('socket.io')
const express = require('express')
const http = require("http");


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

const app = express()

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => ({ req, pubsub }) //protected route post token
// });

//     const http = app.listen(5000)
//     const io = socketIO(http)

//     server.applyMiddleware({app})
//     mongoose.connect(MONGODB, { useNewUrlParser: true })
    

//     .then(() => {
//         console.log('MongoDB Connected');
//         return app.listen({ port: 5000})
//     })

//     .then(res => {
//         console.log(`Server running at ${res.url}`);
//     })

//     .then(() => {
//         io.on('connecttion', (socket) => {
            
//         })
//     })

let apolloServer = null;

mongoose.connect(MONGODB, { useNewUrlParser: true })

async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);

app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
});

app.listen(5000, function () {
    console.log(`server running on port 5000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});

const io = socketIO(httpserver)
io.on('connection', (socket) => {
    // io
})