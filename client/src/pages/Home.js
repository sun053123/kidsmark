import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql'

function Home() {

    const { user } = useContext( AuthContext )

    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
    const { getPosts: posts } = data ? data : [];

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
                {user && ( //if user loged in render post form
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>loading . . . </h1>
                ) : (
                    <Transition.Group>
                        {posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))}
                    </Transition.Group>
                )
                }
            </Grid.Row>

        </Grid>
    )
}



export default Home
