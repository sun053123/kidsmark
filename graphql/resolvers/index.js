const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const quizzesResolvers = require('./quizzes');
const questionsResolvers = require('./questions')
const checkAnsResolvers = require('./checkAns')

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length ,
        commentCount: (parent) => parent.comments.length
    },
    User: {
        overallScore: (parent) => parent.math_score + parent.science_score + parent.socail_score + parent.thail_score + parent.english_score
    },
    Quiz: {
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
        ...questionsResolvers.Mutation,
        ...checkAnsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
};