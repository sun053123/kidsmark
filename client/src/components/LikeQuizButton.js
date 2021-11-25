import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon, Label } from 'semantic-ui-react'


function LikeButton({ user, quiz: {id, likeCount, likes}}){
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if(user && likes.find(like => like.username)){
            setLiked(true)
        } else setLiked(false)
    },[user,likes] )

    const [likedQuiz] = useMutation(LIKE_QUIZ_MUTATION, {
        variables: { quizId: id}
    });

    const likeButton = user ? (
        liked ? (
            <Button color='red'>
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="red" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="red" basic>
                <Icon name="heart" />
            </Button>
    )

    return(
        <Button as='div' labelPosition='right' onClick={ likedQuiz } size='mini'>
                    {likeButton}
                    <Label as='div' basic color='red' pointing='left'>
                       {likeCount}
                    </Label>
                </Button>
    )
}

const LIKE_QUIZ_MUTATION = gql`
  mutation likeQuiz($quizId: ID!) {
    likeQuiz(quizId: $quizId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;