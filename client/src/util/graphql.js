import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
        }
    }
}`

export const FETCH_QUIZZES_QUERY = gql`
    {
        getQuizzes{
            id
            title
            description
            createdAt
            username
            subject
            tags
            categories
            difficulty

            likes{
                username
            }

            comment{
                id
                username
                createdAt
                body
            }

            question{
                id
                body
                username
                correct_answer
                incorrect_answer
                explanation
            }
            
            likeCount
            commentCount
            questionCount
        }
    }
`
