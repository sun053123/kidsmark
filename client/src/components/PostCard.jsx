import React, { useContext } from 'react'
import { Card, Button, Icon, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

function PostCard({ post: {body, createdAt, id, username, likeCount, commentCount, likes }}) {

    const { user } = useContext(AuthContext)

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(parseInt(createdAt)).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>

            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }}>
                <Button labelPosition='right' as={Link} to={`/posts/${id}`} size='mini'>
                    <Button color='red' basic>
                        <Icon name='heart' />
                        Like
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                       {likeCount}
                    </Label>
                </Button>
                    </LikeButton>

                <Button labelPosition='left' as={Link} to={`/posts/${id}`} size='mini'>
                    <Button color='teal' basic>
                        <Icon name='comments' />
                        Comment
                    </Button>
                    <Label as='a' basic color='teal' pointing='left'>
                       {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && <DeleteButton postId={id} /> }
                </Card.Content>
            
        </Card>
    )
}

export default PostCard
