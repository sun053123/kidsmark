const Quiz = require('../../models/Quiz');
const User = require('../../models/User');

const checkAuth = require('../../util/check-auth');

const { AuthenticationError, UserInputError } = require('apollo-server-errors');
const { validateQuizInput, validateQuestionInput } = require('../../util/validators');

function addCreatorHistory(user, quiz){

    const userHistory = User.findById(user.id);

    userHistory.histories.unshift({
        body: quiz.id,
        username: user.username,
        createdAt: new Date().toISOString()
    })
    
    userHistory.save();
}

function generatePin(){
    return Math.floor(100000 + Math.random() * 900000)
}

module.exports = {
    Query: {
        async getQuizzes() {
            try {
                const quizzes = await Quiz.find().sort({ createdAt: -1 }); // sort new post -> old post
                return quizzes;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getQuiz(_, { quizId }) {
            try {
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
        async createQuiz(_, { title, description, subject, tags, categories, difficulty,
            body, choice1, choice2, choice3, correct_answer, explanation }, context) {

            const user = checkAuth(context);

            // const { errorsHeader, validHeader } = validateQuizInput(body, description, subject, tags, categories, difficulty);
            // const { errors, valid } = validateQuestionInput(body, choice1, correct_answer, explanation)
            
            pin = generatePin()

            // console.log(pin)
            
            while (true){ 
                const quizpin = await Quiz.findOne({pin});
                if(quizpin) {
                    pin = generatePin()
                }else{break}
            }

            const newQuiz = new Quiz({ //from model Quiz.js
                title,
                description,
                pin : pin,
                subject,
                tags,
                categories,
                difficulty,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const quiz = await newQuiz.save();

            // console.log("create quiz")

            for (var i = 0; i < correct_answer.length; i++) {

                var bodyTemp = body[i]
                var correct_answerTemp = correct_answer[i]

                var incorrect_answerTemp = []
                incorrect_answerTemp.push(choice1[i], choice2[i], choice3[i])

                var explanationTemp = explanation[i]

                quiz.questions.unshift({
                    body: bodyTemp,
                    username: user.username,
                    correct_answer: correct_answerTemp,
                    incorrect_answer: incorrect_answerTemp,
                    explanation: explanationTemp
                })

                await quiz.save();
                // console.log("create question", [i + 1])

            }
            
            // const userHistory = addCreatorHistory(user, quiz)
            return quiz;

        },
        async deleteQuiz(_, { quizId }, context) {
            const user = checkAuth(context);

            try { // check user delete only their own post (allow only delete their own post)
                const quiz = await Quiz.findById(quizId);
                if (user.username === quiz.username) {
                    await quiz.delete();
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError('Acction not allowed')
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async likeQuiz(_, { quizId }, context) {

            const { username } = checkAuth(context);

            const quiz = await Quiz.findById(quizId);
            if (quiz) {
                if (quiz.likes.find(like => like.username === username)) {
                    //Post already like, unlike it
                    quiz.likes = quiz.likes.filter(like => like.username !== username);
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
        },
        async favQuiz(_, { quizId }, context) {

            const user = checkAuth(context);
            const userfav = await User.findById(user.id);

            if(userfav){
                if (userfav.favorites.find(fav => fav.body === quizId)){
                    //unfav
                userfav.favorites = userfav.favorites.filter(fav => fav.body !== quizId);
            } else {
                //Not Faved, Fav post
                userfav.favorites.unshift({
                    body: quizId,
                    createdAt: new Date().toISOString()
                })
                await userfav.save();
            }
                return userfav;
            } else throw new UserInputError('Quiz not found');

        }
    }

};