import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){ //check exipiration time of token

    const decodedToken = jwtDecode(localStorage.getItem('jwtToken')); //decode token for check exp time

    if(decodedToken.exp * 1000 < Date.now()){ //times 1000 cause it's ms and check expiration
        localStorage.removeItem('jwtToken') // if it's expired // leave initailstate obj user: null casue 
    } else { // if not exp set user = user
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user:null,
    login: (userData) => {},
    logout: () => {}
}) //initial state

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
            case 'LOGOUT':
                return{
                    ...state,
                    user: null
                }
        default:
            return state;
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData){ //login state 
        localStorage.setItem("jwtToken", userData.token) //store login token when user refresh context still have token
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    } 

    function logout() { // logut state
        localStorage.removeItem("jwtToken") //delete token when user logout
        dispatch({
            type: 'LOGOUT'
        });
}
    return (
        <AuthContext.Provider value={{ user: state.user, login, logout}}
        {...props} />
    )

}

export { AuthContext, AuthProvider}