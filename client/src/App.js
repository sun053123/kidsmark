import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
 
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { AuthProvider } from './context/auth.js'
import AuthRoute from './util/AuthRoute'

import MenuBar from './components/MenuBar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import SinglePost from './pages/SinglePost.js'
import Quiz from './pages/Quiz'
import QuizSite from './pages/QuizSite.js'
import CommentQuiz from './pages/CommentQuiz.js'

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home}/>
          <Route exact path="/quizzes" component={Quiz} />
          <AuthRoute exact path="/login" component={Login}/> 
          <AuthRoute exact path="/register" component={Register}/>
          <Route exact path="/quizzes/comments/:quizId" component={CommentQuiz} />
          <Route exact path="/posts/:postId" component={SinglePost}/>
          <Route exact path="/quizzes/:quizId" component={QuizSite} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
