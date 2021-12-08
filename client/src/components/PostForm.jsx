import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'


function PostForm() {
    const [ errors, setErrors] = useState({}); 

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        refetchQueries: [{ query: FETCH_POSTS_QUERY }],
        onError(ApolloError) {
			// console.log(ApolloError);
            setErrors(ApolloError.graphQLErrors[0].extensions.errors) 
		}

      });

      if(errors){
          console.log(errors)}

      function createPostCallback() {
        createPost();
        values.body = '';
      }



    return (
        <> 
       <Form onSubmit={onSubmit}>
           <Form.Field>
           <h2>Create a Post:</h2>
               <Form.Input 
               placeholder="Hi world" 
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

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
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


export default PostForm;
