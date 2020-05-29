import React, { useState, useEffect } from 'react';


import { Container, Row, Col, Media, Badge, Card, Form, Button } from 'react-bootstrap';


import { useHistory } from 'react-router-dom';


import axios from 'axios';


import socketIOClient from "socket.io-client";


//componentes
import Messages from './Messages';
import UserLists from './UserLists';
import SendMessage from './SendMessage';

import Perfil from './Perfil';



export default function Chat(props) {

  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [ user, setUser] = useState([]);
  const [messages , setMessages] = useState([]);


  //solucion para axios 

  const signal = axios.CancelToken.source();

  useEffect(() => {
 
      getUsersConnect();
      getUserConnect(); 
      getMessages();

      return () => signal;

  }, []);

  
  const logout = () => {
    
    const socket = socketIOClient(`${props.url}`);

    socket.disconnect();

    userDisconnect();
    
    localStorage.removeItem('user_id');

    localStorage.removeItem('token');

    history.push("/");     
    
  }


  const getUserConnect = async () => {

    let user = await axios.get(`${props.url}/api/user/${localStorage.getItem('user_id')}`,{
      headers: {
       Authorization: `Bearer ${localStorage.getItem('token')}`
     }}
    );

    setUser(user.data);
    
  }


  const userDisconnect = async () => {

    return await axios.put(`${props.url}/api/user/${localStorage.getItem('user_id')}`,

      {
         online: false

        }
    );

  }



  const getUsersConnect = () => {
    const socket = socketIOClient(`${props.url}`);

    socket.on('users_' , data => {

      let { users } = data;

      setUsers(users);
          
    });

  }


  const getMessages = () => {

    const socket = socketIOClient(`${props.url}`);

    socket.on('messages_' , data => {

      let { messages } = data;

      setMessages(messages);
          
    });
  }


  return (
    <>

      <div className="App-header">
        <h5 className="App">{props.name}</h5>


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
                    <SendMessage getMessages={ getMessages }  url={props.url}/>
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


