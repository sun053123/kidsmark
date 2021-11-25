import React, { useContext, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Grid, Card, Icon, Label, Image, Button, Form, Container } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from '../context/auth'

function ShuffledEveryAnswer(arr) {
    for(let i=0; i<100; i++){

    }
}


function QuizSite( props ) {

    const quizId = props.match.params.quizId; //getId from url

    const { user } = useContext(AuthContext)
    console.log(quizId)

    // const [question, setQuestion] = useState([]);

    const [userAnswer, setUserAnswer] = useState([]);

    const {
        data: { getQuiz } = {}
    } = useQuery(FETCH_QUIZZES_QUERY, {
        variables: {
            quizId
        }
    });

    const [submitAnswer] = useMutation(SUBMIT_ANSWER_QUIZ_MUTATION, {
        update() {
            setUserAnswer([]) //if user commented it's gonna empty the comment windows cause it's updated
        },
        variables: {
            quizId,
            user_answer: userAnswer
        }
    })

    let QuestionCard;

    if (!getQuiz) {
        QuestionCard = <p>Loading Post ...</p>
    } else {
        const { id, title, createdAt, username, questions, questionCount } = getQuiz;
        // const shuffledAnswer = [questions.correct_answer,questions.incorrect_answer]
        // .sort(() => Math.random()-0.5)

        QuestionCard = (
            <Container>
            <div>
                <p>Quiz site</p>
                <p>{id}</p>
                <p>{title}</p>
                <p>{createdAt}</p>
 
                <p>questions</p>
                {questions.map((question,i) => (
                    <Card fluid key={question.id}>
                      <Card.Content>
                      <Card.Header>{i+1} / {questionCount}</Card.Header>
                      <Card.Header>{title}</Card.Header>
                        <Card.Header>{question.body}</Card.Header>
                        <Button>{question.correct_answer}</Button>
                        <Button>{question.incorrect_answer[0]}</Button>
                        <Button>{question.incorrect_answer[1]}</Button>
                        <Button>{question.incorrect_answer[2]}</Button>
                        <Card.Description>{question.explanation}</Card.Description>
                      </Card.Content>
                    </Card>
                  ))}
            </div>
            </Container>
        )
    }

    return QuestionCard
}

const SUBMIT_ANSWER_QUIZ_MUTATION = gql`
  mutation($quizId: String!, $body: String!) {
    checkUserAnswer(quizId: $quizId, user_answer: $user_answer) {
      id
      username
        scores {
            english_score
            math_score
            science_score
            thai_score
            social_score
        }
    }
  }
`;

const FETCH_QUIZZES_QUERY = gql`
    query($quizId: ID!){
        getQuiz(quizId: $quizId){
            id title createdAt username questionCount
            questions {
            id
            body
            correct_answer
            incorrect_answer
            explanation
            }
        }
    }
`;


export default QuizSite
