// const User = require('../../models/Post');
// const checkAuth = require('../../util/check-auth');

// const { AuthenticationError, UserInputError } = require('apollo-server-errors');

// module.exports = {
//     Query: { 
//         async getScores(){
//             try{
//                 const science_score = await User.score.find()({ science_score }); 
//                 const math_score = await User.score.find()({ math_score }); 
//                 const social_score = await User.score.find()({ social_score }); 
//                 const english_score = await User.score.find()({ english_score }); 
//                 const thai_score = await User.score.find()({ thai_score }); 

//                 return science_score, math_score, social_score, english_score, thai_score;
                
//             } catch (err) {
//                 throw new Error(err);
//             }

//         },

//     },
//     Mutation: {
//         async updateProfile(_, { body }, context){
//             const user = checkAuth(context);
//             console.log(user); // check log if we have user ( checkAuth is done )

//             //TODOD check if user have done the quiz before ------
 
//             if (body.trim() === '') {
//                 throw new Error('Post must be not empty'); // Post must be atleast 1 
//             }

//             const newPost = new Post({ //from model Post.js
//                 body,
//                 user: user.id,
//                 username: user.username,
//                 createdAt: new Date().toISOString()
//             });

//             const post = await newPost.save();

//             return post;
//         },
//         async setRole(_, { userId }, context){
//             const { username } = checkAuth(context);

//             const post = await User.findById(userId);
//             if(post){
//                 if(post.likes.find(like => like.username === username)){
//                     //Post already like, unlike it
//                     post.likes = post.likes.filter(like => like.username !== username );
//                 } else {
//                     //Not liked, like post
//                     post.likes.push({
//                         username,
//                         createdAt: new Date().toISOString()
//                     })
//                 }

//                 await post.save();
//                 return post;

//             } else throw new UserInputError('Post not found');
//         }
//     }
// };