const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments')
const quizzesResolvers = require('./quizzes')

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length ,
        commentCount: (parent) => parent.comments.length
    },
    User: {
        overallScore: (parent) => parseInt(parent.math_score + parent.science_score + parent.socail_score + parent.thail_score + parent.english_score)
    },
    Query: {
        ...postsResolvers.Query,
        ...quizzesResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...quizzesResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
};