const { UserInputError, AuthenticationError } = require('apollo-server-errors');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            
            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                });
            }

            const post = await Post.findById(postId);

            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        },
        async deleteComment(_, { postId, commentId}, context){
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if(post){ //find index of comment array
                const commentIndex = post.comments.findIndex( c => c.id === commentId);

                if(post.comments[commentIndex].username === username) { // can only delete own comment
                    post.comments.splice(commentIndex, 1); // delete one comment 
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('Action not allowed'); //safety check
                }
                 
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
}