const Quiz = require('../../models/Quiz');
const checkAuth = require('../../util/check-auth');

const { AuthenticationError, UserInputError } = require('apollo-server-errors');

module.exports = {
    Query: { 
        async getQuizzes(){
            try{
                const quizzes = await Quiz.find().sort({ createdAt: -1 }); // sort new post -> old post
                return quizzes;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getQuiz(_, { quizId }){
            try{
                const quiz = await Quiz.findById(quizId);
                if (quiz) {
                    return quiz;
                } else {
                    throw new Error('Quize not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createQuiz(_, { body, description, subject, tags, categories, difficulty  }, context){
            const user = checkAuth(context);
            console.log(user); // check log if we have user ( checkAuth is done )

            if (body.trim() === '') {
                throw new Error('Quiz must be not empty'); // Post must be atleast 1 
            }

            if (description.trim() === '') {
                throw new Error('Description must be not empty'); 
            }

            if (subject.trim() === '') {
                throw new Error('Subject must be not empty'); 
            }

            if (tags.trim() === '') {
                throw new Error('Tag must be not empty'); 
            }

            if (categories.trim() === '') {
                throw new Error('Category must be not empty'); 
            }

            if (difficulty.trim() === '') {
                throw new Error('Difficulty must be not empty'); 
            }



            const newQuiz = new Quiz({ //from model Quiz.js
                body,
                description,
                subject,
                tags,
                categories,
                difficulty,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const quiz = await newQuiz.save();
            return quiz;
        },
        createQuestion: async (_, { quizId, body, correct_answer, incorrect_answer, explanation }, context) => {
            const { username } = checkAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty Question', {
                    errors: {
                        body: 'Question body must not empty'
                    }
                });
            }

            const quiz = await Quiz.findById(quizId);

            if(quiz){
                quiz.questions.unshift({
                    body,
                    correct_answer,
                    incorrect_answer,
                    explanation,
                    createdAt: new Date().toISOString()
                })
                await quiz.save();
                return quiz;
            } else throw new UserInputError('Quiz not found');
        },
    async deleteQuiz(_, { quizId }, context){
        const user = checkAuth(context);

        try{ // check user delete only their own post (allow only delete their own post)
            const quiz = await Quiz.findById(quizId); 
            if(user.username === quiz.username){
                await quiz.delete();
                return 'Post deleted successfully'
            } else {
                throw new AuthenticationError('Acction not allowed')
            }
    }catch(err){
        throw new Error(err);    
            }
        },
        async likeQuiz(_, { quizId }, context){
            const { username } = checkAuth(context);

            const quiz = await Quiz.findById(quizId);
            if(quiz){
                if(quiz.likes.find(like => like.username === username)){
                    //Post already like, unlike it
                    quiz.likes = quiz.likes.filter(like => like.username !== username );
                } else {
                    //Not liked, like post
                    quiz.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await quiz.save();
                return quiz;

            } else throw new UserInputError('quiz not found');
        },async favQuiz(_,{ quizId }, context){

            
        }
    }
};