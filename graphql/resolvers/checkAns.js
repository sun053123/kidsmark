const { UserInputError, AuthenticationError } = require('apollo-server-errors');

const Quiz = require('../../models/Quiz');
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        async checkUserAnswer(_, { quizId, user_answer }, context) {

            const user = checkAuth(context);
            for (var i = 0; i < user_answer.length; i++) {
                if (user_answer[i].trim() === '') {
                    throw new UserInputError('Empty Answer', {
                        errors: {
                            user_answer: 'user_answer must not empty'
                        }
                    });
                }
            }
            var pointCounter = 0
            const quiz = await Quiz.findById(quizId);

            if (quiz) {
                for (var i = 0; i < quiz.questions.length; i++) {

                    // console.log( i + quiz.questions[i].correct_answer  )
                    // console.log( i + user_answer[i] )

                    if (quiz.questions[i].correct_answer == user_answer[i]) {
                        console.log("no." + (i + 1) + " Correct")
                        pointCounter++
                    } else console.log("no." + (i + 1) + " Incorrect")
                }

                const userscore = await User.findById(user.id);
                // console.log("history = " + userscore.histories )

                if (userscore.histories.find(history => (history.body === quizId || history.body === undefined || history.body === '' || history.body === [] || history.body === null))) {
                    throw new Error("You have done this quiz before!")
                    //user done the quiz
                } else {
                    //user never do this quiz
                    if (quiz.subject === "science") {
                        parseInt(userscore.scores.science_score)
                        if (userscore.scores.science_score == null || NaN || undefined) {
                            userscore.scores.science_score = 0
                        }

                        userscore.scores.science_score = parseInt(userscore.scores.science_score) + parseInt(pointCounter)
                        console.log("case " + quiz.subject + " , score = " + pointCounter)
                    }
                    if (quiz.subject === "math") {
                        parseInt(userscore.scores.math_score)
                        if (userscore.scores.math_score == null || NaN || undefined) {
                            userscore.scores.math_score = 0
                        }

                        userscore.scores.math_score = parseInt(userscore.scores.math_score) + parseInt(pointCounter)
                        console.log("case " + quiz.subject + " , score = " + pointCounter)
                    }
                    if (quiz.subject === "social") {
                        parseInt(userscore.scores.social_score)
                        if (userscore.scores.social_score == null || NaN || undefined) {
                            userscore.scores.social_score = 0
                        }

                        userscore.scores.social_score = parseInt(userscore.scores.social_score) + parseInt(pointCounter)
                        console.log("case " + quiz.subject + " , score = " + pointCounter)
                    }
                    if (quiz.subject === "thai") {
                        parseInt(userscore.scores.thai_score)
                        if (userscore.scores.thai_score == null || NaN || undefined) {
                            userscore.scores.thai_score = 0
                        }

                        userscore.scores.thai_score = parseInt(userscore.scores.thai_score) + parseInt(pointCounter)
                        console.log("case " + quiz.subject + " , score = " + pointCounter)
                    }
                    if (quiz.subject === "english") {
                        parseInt(userscore.scores.english_score)
                        if (userscore.scores.english_score == null || NaN || undefined) {
                            userscore.scores.english_score = 0
                        }

                        userscore.scores.english_score = parseInt(userscore.scores.english_score) + parseInt(pointCounter)
                        console.log("case " + quiz.subject + " , score = " + pointCounter)
                    }
                }
                userscore.histories.unshift({
                    body: quizId,
                    username: quiz.username,
                    createdAt: new Date().toISOString()
                })
                console.log("recived = " + pointCounter + " point(s) to " + quiz.subject + " score, and added history")
                await userscore.save();
                return userscore;

            } else throw new Error("Quiz Doesn't exist!")
        }


    }
}

