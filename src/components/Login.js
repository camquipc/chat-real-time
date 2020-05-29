import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link,   useHistory } from 'react-router-dom';

import axios from 'axios';


export default function Login() {

  const history = useHistory();
  
  const [user, setUser] = useState("");

  const [password, setPassword] = useState("");

  const [isLongin, setisLongin] = useState(false);

  const login = async (e) => {

    e.preventDefault();
  
    //connect to api 
   
    try {
    
      const getLogin = await axios.post('https://chatrealtimeapi.herokuapp.com/api/login', {
          "username" : user,
          "password" : password
        });

      if(getLogin.status === 200) {
        //creamos las session localstore

        let {_id} = getLogin.data.user[0];

        let {token} = getLogin.data;

        online(_id);

        localStorage.setItem('token', token);
        localStorage.setItem('user_id', _id);

        //setisLongin(true);

        history.push("/chat");
      }
    
    } catch (error) {
      console.log(error);
    }
  }


  const online = async (_id) => {

  
    const getLogin = await axios.put('https://chatrealtimeapi.herokuapp.com/api/user/'+_id);
     
  }




  return (
  
     <div className="App-header" >
      <Container>
        <Row>

          <Col md={{ span: 3, offset: 4 }}>

            <h5>Login in Chat</h5>

            <Form onSubmit={(e) => login(e)}>

              <Form.Group>
                <Form.Control size="sm" 
                  type="text"
                  placeholder="Username"
                  onChange={(event) => setUser(event.target.value)}  required/>
              </Form.Group>

              <Form.Group>
                <Form.Control size="sm" 
                  type="password"  
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)} required/>
              </Form.Group>

              <Button variant="outline-dark" size="sm" type="submit" block className="outline-dark">
                Login
              </Button>

               <Button variant="outline-dark" size="sm" block >
               <Link to="/register" className="link" 
              style={{marginTop:'10px', fontSize:'14px', textAlign:"center", color:"#fff"}}>Sign in </Link>
              </Button>
              
            </Form>
          </Col>
        </Row>

      </Container>
      </div>
  );
}




