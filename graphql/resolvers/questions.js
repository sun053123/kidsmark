const { UserInputError, AuthenticationError } = require('apollo-server-errors');

const Quiz = require('../../models/Quiz');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        createQuestion: async (_, { quizId, body, correct_answer, incorrect_answer, explanation }, context) => {
            const { username } = checkAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty Question', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                });
            }

            if (correct_answer.trim() === '') {
                throw new Error('Correct answer must be not empty'); 
            }

            if (incorrect_answer.trim() === '') {
                throw new Error('Incorrect answer must be not empty'); 
            }

            

            const quiz = await Quiz.findById(quizId);

            if(quiz){
                quiz.questions.unshift({
                    body,
                    username,
                    correct_answer,
                    incorrect_answer,
                    explanation
                })
                await quiz.save();
                return quiz;
            } else throw new UserInputError('Quiz not found');
        },
        async deleteQuestion(_, { quizId, questionId}, context){
            const { username } = checkAuth(context);

            const quiz = await Quiz.findById(quizId);

            if(quiz){ //find index of question array
                const questionIndex = quiz.questions.findIndex( qt => qt.id === questionId);

                if(quiz.questions[questionIndex].username === username) { // can only delete own comment
                    quiz.questions.splice(questionIndex, 1); // delete one comment 
                    await quiz.save();
                    return quiz;
                } else {
                    throw new AuthenticationError('Action not allowed'); //safety check
                }
                 
            } else {
                throw new UserInputError('Quiz not found');
            }
        }
    }
}