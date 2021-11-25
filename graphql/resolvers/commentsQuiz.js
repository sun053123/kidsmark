const { UserInputError, AuthenticationError } = require('apollo-server-errors');

const Quiz = require('../../models/Quiz');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        createCommentQuiz: async (_, { quizId, body }, context) => {
            const { username } = checkAuth(context);
            
            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                });
            }

            const quiz = await Quiz.findById(quizId);

            if(quiz){
                quiz.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await quiz.save();
                return quiz;
            } else throw new UserInputError('Post not found');
        },
        async deleteCommentQuiz(_, { quizId, commentId}, context){
            const { username } = checkAuth(context);

            const quiz = await Quiz.findById(quizId);

            if(quiz){ //find index of comment array
                const commentIndex = quiz.comments.findIndex( c => c.id === commentId);

                if(quiz.comments[commentIndex].username === username) { // can only delete own comment
                    quiz.comments.splice(commentIndex, 1); // delete one comment 
                    await quiz.save();
                    return quiz;
                } else {
                    throw new AuthenticationError('Action not allowed'); //safety check
                }
                 
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
}