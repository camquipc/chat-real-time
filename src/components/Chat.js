import React, { useState, useEffect } from 'react';


import { Container, Row, Col, Media, Badge, Card, Form, Button } from 'react-bootstrap';


import { useHistory } from 'react-router-dom';


import axios from 'axios';
//import url from '../url_api';

import socketIOClient from "socket.io-client";


//componentes
import Messages from './Messages';
import UserLists from './UserLists';
import SendMessage from './SendMessage';

import Perfil from './Perfil';



export default function Chat() {

  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [ user, setUser] = useState([]);
  const [messages , setMessages] = useState([]);

  useEffect(() => {

    axios.get('https://chatrealtimeapi.herokuapp.com/api/users', {headers: {
       Authorization: `Bearer ${localStorage.getItem('token')}`
     }})
      .then(response => {
        console.log(response.data)
        setUsers(response.data)
      })
      .catch(error => console.log(error));



      getUserConnect(); 
      getMessages();

  }, []);

  
  const logout = () => {
    
    const socket = socketIOClient(`https://chatrealtimeapi.herokuapp.com`);

    socket.disconnect();
    
    localStorage.removeItem('user_id');

    localStorage.removeItem('token');

    history.push("/");     
    
  }


  const getUserConnect = async () => {
    let u = await axios.get('https://chatrealtimeapi.herokuapp.com/api/user/'+ localStorage.getItem('user_id'),{
      headers: {
       Authorization: `Bearer ${localStorage.getItem('token')}`
     }}
    );

    setUser(u.data);
  }


  const getMessages = () => {

    const socket = socketIOClient(`https://chatrealtimeapi.herokuapp.com`);


    socket.on('messages_' , data => {

      let { messages } = data;

      
      setMessages(messages);
          
    });
  }


  return (
    <>

      <div className="App-header">
        <h5 className="App">------- Chat RealTime ------- </h5>


        <Container >
          <Container>
            <Row className="p-0">
              <Col sm={2} style={{ background: '#282c34' }} className="pt-3 user_list mhs" >
                <Perfil user={user} logout={logout} />
                <UserLists users={users} />
              </Col>
              <Col sm={9} className="pt-2 mhs" >
                <Messages messages={messages} />
              </Col>
              <Container>
                <Row>
                  <Col sm={3} className="pt-2 ">

                  </Col>
                  <Col sm={8} className="pt-4 ">
                    <SendMessage getMessages={ getMessages }/>
                  </Col>
                </Row>
              </Container>

            </Row>
          </Container>
        </Container>
      </div>
    </>
  );
}


