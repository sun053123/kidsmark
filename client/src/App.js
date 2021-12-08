import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
 
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import Quiz from './pages/Quiz'
import QuizSite from './pages/QuizSite'
import CommentQuiz from './pages/CommentQuiz'

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Container>
          <MenuBar />
          <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/quizzes" element={<Quiz/>} />
          <Route exact path="/login" element={<AuthRoute/>}/> 
          <Route exact path="/register" element={<AuthRoute/>}/>
          <Route exact path="/quizzes/comments/:quizId" element={<CommentQuiz/>} />
          <Route exact path="/posts/:postId" element={<SinglePost/>}/>
          <Route exact path="/quizzes/:quizId" element={<QuizSite/>} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
