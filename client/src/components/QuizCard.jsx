import React, { useContext } from 'react'
import { Card, Button, Icon, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeQuizButton from './LikeQuizButton'
import DeleteQuizButton from './DeleteQuizButton'


function QuizCard({ quiz: {title, createdAt, id, username, likeCount, commentCount, questionCount, likes }}) {

    const { user } = useContext(AuthContext)

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/quizzes/${id}`}>{moment(parseInt(createdAt)).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {title}
                </Card.Description>

            </Card.Content>

            <Card.Content extra>
                <LikeQuizButton user={user} quiz={{ id, likes, likeCount }}>
                <Button labelPosition='right' as={Link} to={`/quizzes/${id}`} size='mini'>
                    <Button color='red' basic>
                        <Icon name='heart' />
                        Like
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                       {likeCount}
                    </Label>
                </Button>
                    </LikeQuizButton>

                <Button labelPosition='left' as={Link} to={`/quizzes/comments/${id}`} size='mini'>
                    <Button color='teal' basic>
                        <Icon name='comments' />
                        Comment
                    </Button>
                    <Label as='a' basic color='teal' pointing='left'>
                       {commentCount}
                    </Label>
                </Button>
                <Button labelPosition='left' as={Link} to={`/quizzes/${id}`} size='mini'>
                    <Button color='purple' basic>
                        <Icon name='question' />
                        Question
                    </Button>
                    <Label as='a' basic color='purple' pointing='left'>
                       {questionCount}
                    </Label>
                </Button>
                {user && user.username === username && <DeleteQuizButton quizId={id} /> }
                </Card.Content>
        </Card>
    )
}

export default QuizCard
