import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon, Label } from 'semantic-ui-react'


function LikeButton({ user, post: {id, likeCount, likes}}){
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if(user && likes.find(like => like.username)){
            setLiked(true)
        } else setLiked(false)
    },[user,likes] )

    const [likedPost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id}
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
        user? (
            <Button as='div' labelPosition='right' onClick={likedPost}>
                {/* <CustomPopup content={liked? 'unlike post': 'like post'}> */}
                {likeButton} 
                <Label as='div' basic color='red' pointing='left'>
                {likeCount}
                </Label>
                {/* </CustomPopup> */}
            </Button>
        ):(
            <Button labelPosition='right' as='a' href='/login'>
                {/* <CustomPopup content={liked? 'unlike post': 'like post'}> */}
                {likeButton} 
                <Label as='div' basic color='red' pointing='left'>
                {likeCount}
                </Label>
                {/* </CustomPopup> */}
            </Button>
        )
    )
}


const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
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

