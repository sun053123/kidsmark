const { gql } = require('apollo-server');

module.exports = gql`

    type Quiz{
        id: ID!
        body: String!
        description: String!
        subject: String!
        tags: String!
        categories: String!
        difficulty: String!
        likes: [Like]!
        likeCount: Int!
        comments: [Comment]!
        commentCount: Int!
        questions: [Question!]!

        createdAt: String!
        username: String!
    }
    type Question{
        id: ID!
        body: String!
        correct_answer: String!
        incorrect_answer: String!
        explanation: String!
    }

    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
        overallScore: Int!
        scores:[Score]!
    }
    type Score{
        science_score: Int!
        math_score: Int!
        english_score: Int!
        thai_score: Int!
        social_score: Int!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getQuizzes: [Quiz]
        getQuiz(quizId: ID!): Quiz
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post! 
        likeQuiz(quizId: ID!): Quiz!

        deleteQuiz(quizId: ID!): String!
        createQuiz(
            body: String!
            description: String!
            subject: String!
            tags: String!
            categories: String!
            difficulty: String!): Quiz!

        createQuestion(
            quizId: String!
            body: String!
            correct_answer: String!
            incorrect_answer: String!
            explanation: String!
        ): Quiz!
    }
    type Subscription {
        newPost: Post!
    }
`;