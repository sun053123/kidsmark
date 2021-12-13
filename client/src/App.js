import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

import MenuBar from './components/MenuBar';
// import Home from './pages/Home';
// import Login from './pages/Login'
// import Register from './pages/Register'
// import SinglePost from './pages/SinglePost'
// import Quiz from './pages/Quiz'
// import QuizSite from './pages/QuizSite'
// import CommentQuiz from './pages/CommentQuiz'
import Quizroom from './pages/Quizroom'
import QuizSetGame from './pages/QuizSetGame'; 

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const SinglePost = lazy(() => import('./pages/SinglePost'));
const Quiz = lazy(() => import('./pages/Quiz'));
const QuizSite = lazy(() => import('./pages/QuizSite'));
const CommentQuiz = lazy(() => import('./pages/CommentQuiz'));


const App = () => {  
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/quizzes" element={<Quiz />} />
            <Route exact path="/login" element={<AuthRoute><Login /></AuthRoute>} />
            <Route exact path="/register" element={<AuthRoute><Register /></AuthRoute>} />
            
            <Route exact path="/quizsetgame" element={<QuizSetGame/>}/>
            <Route exact path="/quizroom" element={<Quizroom />} />
            <Route exact path="/quizzes/comments/:quizId" element={<CommentQuiz />} />
            <Route exact path="/posts/:postId" element={<SinglePost />} />
            <Route exact path="/quizzes/:quizId" element={<QuizSite />} />
          </Routes>
          </Suspense>
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
