import React, { useContext, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Grid, Card, Icon, Label, Image, Button, Form } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeQuizButton from '../components/LikeQuizButton'
import DeleteQuizButton from '../components/DeleteQuizButton'


function CommentQuiz( props ) {

    const quizId = props.match.params.quizId; //getId from url

    const { user } = useContext(AuthContext)
    console.log(quizId)

    const [ comment, setComment ] = useState('');

    const {
        data: { getQuiz } = {}
      } = useQuery(FETCH_QUIZZES_QUERY, {
        variables: {
            quizId
        }
      });

    const [ submitComment ] = useMutation(SUBMIT_COMMENT_QUIZ_MUTATION, {
        update(){
            setComment('') //if user commented it's gonna empty the comment windows cause it's updated
        },
        variables: {
            quizId,
            body: comment
        }
    })

    function deleteQuizCallback(){
        props.history.push("/quizzes")
    }

    let postMarkup;

    if(!getQuiz){
        postMarkup = <p>Loading Post ...</p>
    } else {
        const { id, title, createdAt, username, comments, likes, likeCount, commentCount} =
        getQuiz;

        postMarkup = (
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  
                </Grid.Column>
                <Grid.Column width={10}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>{username}</Card.Header>
                      <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                      <Card.Description>{title}</Card.Description>
                    </Card.Content>
                    <hr />
                    <Card.Content extra>
                      <LikeQuizButton user={user} quiz={{ id, likeCount, likes }} />
                      {user && user.username === username && (
                        <DeleteQuizButton quizId={id} callback={deleteQuizCallback} />
                      )}
                    </Card.Content>
                  </Card>
                  {user && (
                    <Card fluid>
                      <Card.Content>
                        <p>Quiz a comment</p>
                        <Form>
                          <div className="ui action input fluid">
                            <input
                              type="text"
                              placeholder="Comment.."
                              name="comment"
                              value={comment}
                              onChange={(event) => setComment(event.target.value)}
                              
                            />
                            <button
                              type="submit"
                              className="ui button teal"
                              disabled={comment.trim() === ''}
                              onClick={submitComment}
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      </Card.Content>
                    </Card>
                  )}
                  {comments.map((comment) => (
                    <Card fluid key={comment.id}>
                      <Card.Content>
                        {user && user.username === comment.username && (
                          <DeleteQuizButton quizId={id} commentId={comment.id} />
                        )}
                        <Card.Header>{comment.username}</Card.Header>
                        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                        <Card.Description>{comment.body}</Card.Description>
                      </Card.Content>
                    </Card>
                  ))}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        }

    return postMarkup;
    
}
const SUBMIT_COMMENT_QUIZ_MUTATION = gql`
  mutation($quizId: String!, $body: String!) {
    createCommentQuiz(quizId: $quizId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_QUIZZES_QUERY = gql`
    query($quizId: ID!){
        getQuiz(quizId: $quizId){
            id title createdAt username likeCount
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
    }
`;

export default CommentQuiz


