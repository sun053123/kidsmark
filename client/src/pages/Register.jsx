import React, { useContext, useState } from 'react'
import{ Form, Button } from 'semantic-ui-react'
import{ useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth.js'
import { useForm } from '../util/hooks.js'

function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({}); 

    const { onChange, onSubmit, values } = useForm(registerUser, { //addUser not work here because They're nothing inside we need to call function RegisteraddUser down below because variable doesnot exist if we but this const after addUser
        username: '' ,
        email: '' ,
        password: '' ,
        confirmPassword: ''
    })

    // original state
    // const [addUser, { loading }] = useMutation(REGISTER_USER, {
    //     update(proxy, result){ //if mutation triger successfully
    //         console.log(result);
    //     },
    //     variables: { 
    //         username: values.username,
    //         email: values.email,
    //         password: values.password,
    //         confirmPassword: values.confirmPassword,
    //     }
    // })

    const [ addUser, { loading } ] = useMutation(REGISTER_USER, {
		update(_, {data: {register: userData}}) {
			// console.log(result); //finish register will sent result
            context.login(userData)
            props.history.push('/'); // finish register will sent user to home page
		},
		variables: values,
		onError(ApolloError) {
			// console.log(ApolloError);
            setErrors(ApolloError.graphQLErrors[0].extensions.errors)
		}
	});

    function registerUser() { //trigger addUser
        addUser(); //when complie ,it will read up from up to down below and read through the setstate before trigger in this function
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''} >

                <h1> Register </h1>

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
                label="Email" 
                placeholder="email..." 
                name="email"
                type="email" 
                value={values.email}
                error={errors.email ? true : false}
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

                <Form.Input 
                label="Confirm Password" 
                placeholder="confirm password..." 
                name="confirmPassword"
                type="password" 
                value={values.confirmPassword}
                error={errors.confirmPassword ? true : false}
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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }}
`

export default Register;
