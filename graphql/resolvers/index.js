const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const quizzesResolvers = require('./quizzes');
const checkAnsResolvers = require('./checkAns')
const commentsQuizResolvers = require('./commentsQuiz')

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length ,
        commentCount: (parent) => parent.comments.length
    },
    User: {
        overallScore: (parent) => parseInt(parent.math_score) + parseInt(parent.science_score) + parseInt(parent.socail_score) + parseInt(parent.thail_score) + parseInt(parent.english_score)
    },
    Quiz: {
        likeCount: (parent) => parent.likes.length ,
        commentCount: (parent) => parent.comments.length,
        questionCount: (parent) => parent.questions.length
    },
    Query: {
        ...postsResolvers.Query,
        ...quizzesResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...quizzesResolvers.Mutation,
        ...checkAnsResolvers.Mutation,
        ...commentsQuizResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
};