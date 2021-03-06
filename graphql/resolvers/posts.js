const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

const { AuthenticationError, UserInputError } = require('apollo-server-errors');

module.exports = {
    Query: { 
        async getPosts(){
            try{
                const posts = await Post.find().sort({ createdAt: -1 }); // sort new post -> old post
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }){
            try{
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context){
            const user = checkAuth(context);
            console.log(user); // check log if we have user ( checkAuth is done )

            if (body.trim() === '') {
                throw new Error('Post must be not empty'); // Post must be atleast 1 
            }

            const newPost = new Post({ //from model Post.js
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            })

            return post;
        },
    async deletePost(_, { postId }, context){
        const user = checkAuth(context);

        try{ // check user delete only their own post (allow only delete their own post)
            const post = await Post.findById(postId); 
            if(user.username === post.username){
                await post.delete();
                return 'Post deleted successfully'
            } else {
                throw new AuthenticationError('Acction not allowed')
            }
    }catch(err){
        throw new Error(err);    
            }
        },
        async likePost(_, { postId }, context){
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                if(post.likes.find(like => like.username === username)){
                    //Post already like, unlike it
                    post.likes = post.likes.filter(like => like.username !== username );
                } else {
                    //Not liked, like post
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save();
                return post;

            } else throw new UserInputError('Post not found');
        }
    },
    Subcription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
};