import React, { useState } from 'react';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { useHistory , Link } from 'react-router-dom';

import moment from 'moment';

import axios from 'axios';


function Register() {

  const [user, setUser] = useState(null);

  const [password, setPassword] = useState(null);

  const history = useHistory();

  const singup = async (e) => {

    e.preventDefault();
  
    axios.post('https://chatrealtimeapi.herokuapp.com/api/singup', {
        username : user,
          password : password,
          avatar:`http://gravatar.com/avatar/${moment().unix()}?d=identicon`
        }).then(res => {
          if(res.status === 201) {
        
            history.push("/");
   
          }
        })

       
  }

  return (
    <div className="App-header">
      <Container>
        <Row>
          <Col md={{ span: 3, offset: 4 }}>
            
            <h5>Register in Chat</h5>

            <Form onSubmit={(e) => singup(e)}>
              <Form.Group>
                <Form.Control size="sm" 
                  type="text"
                  placeholder="Username"
                  onChange={(event) => setUser(event.target.value)} required/>
              </Form.Group>

              <Form.Group>
                <Form.Control size="sm" 
                  type="password"  
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)} required />
              </Form.Group>

              <Button variant="outline-dark" size="sm" type="submit" block className="outline-dark">
               Register
              </Button>

               <Button variant="outline-dark" size="sm" block >
               <Link to="/" className="link" 
              style={{marginTop:'10px', fontSize:'14px', textAlign:"center", color:"#fff"}}>Login</Link>
              </Button>
            </Form>
          </Col>
        </Row>

      </Container>

    </div>
  );
}

export default Register;