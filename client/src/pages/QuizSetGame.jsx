import React, {useState, useEffect, useContext} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useForm } from '../util/hooks'
import gql from 'graphql-tag'
import { Grid, Transition } from 'semantic-ui-react';
import { AuthContext } from '../context/auth'

function QuizSetGame() {

    const { user } = useContext(AuthContext)


  const { loading, error, data } = useQuery(FETCH_USER_QUIZ_QUERY);
  const { getUserQuiz: user_quizzes } = data ? data : [];

    useEffect(() =>{
        console.log(data)
        if (loading) return <div>Loading</div>;
        if (error) return <p>ERROR</p>;
        if (!data) return <p>Not found</p>;
      })
    return (
        <div>
            {user_quizzes && user_quizzes.map(userquiz => (
                        <Grid.Column key={userquiz.id} style={{ marginBottom: 20 }}>
                            <p userquiz={userquiz} />
                        </Grid.Column>
                    ))}
            
        </div>
    )
}

export default QuizSetGame

const FETCH_USER_QUIZ_QUERY = gql`
    query{
        getUserQuiz{
            id 
            title
            description
            
        }
    }
`;
