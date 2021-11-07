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
        questionCount: Int!

        createdAt: String!
        username: String!
    }
    type Question{
        id: ID!
        username: String!
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
        scores:Score!
        favorites:[FavQuiz]
        histories:[History]
    }
    type Score{
        science_score: String
        math_score: String
        english_score: String
        thai_score: String
        social_score: String
    }
    type FavQuiz{
        id: ID!
        createdAt: String!
        body: String!
    }
    type History{
        id: ID!
        createdAt: String!
        body: String!
        username: String!
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
        checkUserAnswer( quizId:ID!, subject:String!, user_answer:[String]! ):User!
        
        createQuiz(
            body: String!,
            description: String!,
            subject: String!,
            tags: String!,
            categories: String!,
            difficulty: String!): Quiz!

        deleteQuiz(quizId: ID!): String!

        createQuestion(
            quizId: String!,
            body: String!,
            correct_answer: String!,
            incorrect_answer: String!,
            explanation: String!,
        ): Quiz!

        deleteQuestion(
            quizId: ID!, 
            questionId: ID!): Quiz!

        favQuiz(quizId:ID!):Quiz!
    }
    type Subscription {
        newPost: Post!
    }
`;