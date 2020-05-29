import React, { useState } from 'react';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { useHistory , Link } from 'react-router-dom';

import moment from 'moment';

import axios from 'axios';

import { BarLoader } from 'react-spinners';


function Register(props) {

  const [user, setUser] = useState(null);

  const [password, setPassword] = useState(null);

  const history = useHistory();

  const [ loader , setLoader ] = useState(false);

  const singup = async (e) => {

    e.preventDefault();

    setLoader(true);
  
    axios.post(`${props.url}/api/singup`, {
          username : user,
          password : password

        }).then(res => {
          if(res.status === 201) {
            
            setLoader(false);
            history.push("/");
   
          }else{

            console.log('ERROR');
          }
        })

       
  }

  return (
    <div className="App-header">
      <Container>

        <Row>

          <Col md={{ span: 3, offset: 4 }}>
            
            <h5 style={{textAlign:"center"}}>Register in Chat</h5>


            <div style={{width: '100%'}} className="mb-3">
             <BarLoader sizeUnit={"px"} size={20} width={255} color={'#61dafb'}  loading={loader} /> 
            </div>

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

              <p style={{marginTop:'10px', fontSize:'14px', textAlign:"center", color:"#fff"}}>
                  Alredy have on account <Link to="/" className="link">Login</Link>
              </p>
          
            </Form>
          </Col>
        </Row>

      </Container>

    </div>
  );
}

export default Register;