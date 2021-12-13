import React, { useContext, useState } from 'react'
import{ Form, Button } from 'semantic-ui-react'
import{ useMutation } from '@apollo/react-hooks'
import{ gql } from 'graphql-tag'

import { AuthContext } from '../context/auth.js'
import { useForm } from '../util/hooks.js'


function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({}); 

    const { onChange, onSubmit, values } = useForm(loginUserCallback,{
        username: '',
        password: ''
    })

    
    const [ loginUser, { loading } ] = useMutation(LOGIN_USER, {
		update(_, {data: {login: userData}}) {
			// console.log(result); //finish register will sent result
            context.login(userData)
            props.history.push('/') ; // finish register will sent user to home page
		},
		variables: values,
		onError(ApolloError) {
			console.log(ApolloError);
            setErrors(ApolloError.graphQLErrors[0].extensions.errors);

		}
	});

    function loginUserCallback(){
        loginUser();
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''} >

                <h1> Login </h1>

                <Form.Input 
                label="Username" 
                placeholder="username..." 
                name="username"
                type="text" 
                value={values.username}
                error={errors.username ? true : false}
                onChange={onChange}>
                </Form.Input>

                <Form.Input 
                label="Password" 
                placeholder="password..." 
                name="password"
                type="password"  
                value={values.password}
                error={errors.password ? true : false}
                onChange={onChange}>
                </Form.Input>

                <Button type="submit" primary>
                    Submit
                </Button>

            </Form>
            
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
            
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
                username: $username
                password: $password
        ){
            id email username createdAt token
        }}
`

export default Login;
