import React, { useState, useEffect, useContext } from 'react'
import Header from "../socketclient/Components/Header/Header";
import Main from "../socketclient/Components/Main/Main";
import Footer from "../socketclient/Components/Footer/Footer";
import JoinRoomModal from "../socketclient/Components/JoinRoomModal/JoinRoomModal";
import io from "socket.io-client";

import { AuthContext } from '../context/auth'


const socket = io.connect("http://localhost:5000");

function Quizroom() {

  const { user } = useContext(AuthContext)

  const [showModal, setShowModal] = useState(false);
  const [roomCode, setRoomCode] = useState(null);

  const [quiz_id, setQuiz_id] = useState(null);
  const [selector, setSelector] = useState(null);


  // const { values, onChange, onSubmit } = useForm(selectQuizCallback, {
  //   body: ''
  // });

  // function selectQuizCallback() {
  //   createPost();
  //   values.body = '';
  // }

  useEffect(() => {
    
    
    console.log(roomCode);
    if (roomCode) {
      socket.emit("joinRoom", roomCode);
    }
  }, [roomCode]);

  return (
    <>
    {user ?  (
    <p> have user</p>) : (<p> not have user</p>)}
    
      <JoinRoomModal
        showModal={showModal}
        setShowModal={setShowModal}
        setRoomCode={setRoomCode}
      />
      <Header />
      <Main socket={socket} roomCode={roomCode} />
      <Footer setShowModal={setShowModal} />
    </>
  )
}

export default Quizroom

