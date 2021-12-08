import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../util/hooks'
import { FETCH_QUIZZES_QUERY } from '../util/graphql'

function QuizForm() {                         
    const [ errors, setErrors] = useState({}); 

    const { values, onChange, onSubmit } = useForm(createQuizCallback, {
        title: ''

    }); //when user already posted ,form will set to null

    const [createQuiz, { error }] = useMutation(CREATE_QUIZ_MUTATION, {
        variables: values,
        refetchQueries: [{ query: FETCH_QUIZZES_QUERY }],
        onError(ApolloError) {
			// console.log(ApolloError);
            setErrors(ApolloError.graphQLErrors[0].extensions.errors) 
		}

      });

      if(errors){
          console.log(errors)}

      function createQuizCallback() {
        createQuiz();
        values.body = '';
      }

    return (
        <> 
       <Form onSubmit={onSubmit}>
           <Form.Field>
           <h2>Create a Post:</h2>
               <Form.Input 
               placeholder="Quiz Title" 
               name="body" 
               onChange={onChange} 
               value={values.body}
               error = {error ? true : false}/>

              <Form.Input 
               placeholder="Number of Question" 
               name="body" 
               onChange={onChange} 
               value={values.body}
               error = {error ? true : false}/>
                <Button type="submit" color="primary">Submit</Button>
               </Form.Field>
        </Form>
        {error && (
            <div className="ui error message" style={{marginBottom : 20}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
        </>
    )
}

const CREATE_QUIZ_MUTATION = gql`
  mutation createQUIZ($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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


export default QuizForm;
