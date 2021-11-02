const { AuthenticationError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    // context = { ... headers } get header from context to check auth
    const authHeader = context.req.headers.authorization; 
    if(authHeader){ //if we have (auth) , we need token 
        // Bearer ....
        const token = authHeader.split('Bearer ')[1]; // second is token
        if(token){
            try{
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch(err){
                throw new AuthenticationError('Invalid/Expired token'); // specific Error about authenticate if we fail from checking authenticate
            }
        }
        // if(token) fail (we dont have token) will send here 
        throw new Error("Authentication toke must be 'Bearer [token]'");
    }
    //if(authHeader) fail authHeader didn't split 
    throw new Error('Authorization header must be provided');
}