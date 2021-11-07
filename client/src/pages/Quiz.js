import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import QuizCard from '../components/QuizCard.js';
import QuizForm from '../components/QuizForm';
import { FETCH_QUIZZES_QUERY } from '../util/graphql'

function Quiz() {

    const { user } = useContext( AuthContext )

    const { loading, error, data } = useQuery(FETCH_QUIZZES_QUERY);
    const { getQuizzes: quizzes } = data ? data : [];

    if (loading) return <div>Loading</div>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    // const posts = data.getPosts;
    // console.log(posts);
    // console.log(posts)


    return (
        <Grid columns={3} divided>
            <Grid.Row className={"page-title"}>
                <h1>Recent Post</h1>
            </Grid.Row>


            <Grid.Row>
                {user && ( //if user loged in render quiz form
                    <Grid.Column>
                        <QuizForm/>
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>loading . . . </h1>
                ) : (
                    <Transition.Group>
                        {quizzes && quizzes.map(quiz => (
                        <Grid.Column key={quiz.id} style={{ marginBottom: 20 }}>
                            <QuizCard post={quiz} />
                        </Grid.Column>
                    ))}
                    </Transition.Group>
                )
                }
            </Grid.Row>

        </Grid>
    )
}



export default Quiz
