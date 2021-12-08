import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Button, Confirm ,Icon } from 'semantic-ui-react';
import { FETCH_QUIZZES_QUERY } from '../util/graphql'

function DeleteQuizButtton({ quizId, questionId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const mutation = questionId ? DELETE_QUESTION_MUTATION : DELETE_QUIZ_MUTATION

    const [ deleteQuizOrMutation ] = useMutation(mutation, {
        update(proxy){
            setConfirmOpen(false);
            if(!questionId){
                const data = proxy.readQuery({
                    query: FETCH_QUIZZES_QUERY
                });
    
                proxy.writeQuery({ query: FETCH_QUIZZES_QUERY, data:{
                    getQuizzes: data.getQuizzes.filter(q => q.id !== quizId)
                } });
                
            }
            if (callback) callback();

        },
        variables: {
            quizId,
            questionId
        }
    })

    return (
        <>
        <Button
            as="div"
            color='red'
            onClick={() => setConfirmOpen(true)} size='mini'>
            <Icon name='trash' style={{ margin: 0 }}>

            </Icon>
        </Button>
        <Confirm 
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteQuizOrMutation}>
        </Confirm>
        </>
    )
}

const DELETE_QUIZ_MUTATION = gql`
    mutation deletePost($quizId: ID!){
        deletePost(quizId: $quizId)
    }
`;
const DELETE_QUESTION_MUTATION = gql`
    mutation deleteQuiz($quizId: ID!, $questionId: ID!){
        deleteQuestion(quizId: $quizId, commentId: $questionId){
            id
            questions {
                id
                username
                body
                correct_answer
                incorrect_answer
                explanation
            }
            questionCount
        }
    }
`;

export default DeleteQuizButtton;
