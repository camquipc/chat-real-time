import React, { useState } from 'react';
import { Link,   useHistory } from 'react-router-dom';


import { Form, Button, Container, Row, Col } from 'react-bootstrap';


import axios from 'axios';

import { BarLoader } from 'react-spinners';



export default function Login(props) {

  const history = useHistory();
  
  const [user, setUser] = useState("");

  const [password, setPassword] = useState("");

  const [isLongin, setisLongin] = useState(false);

  const [ loader , setLoader ] = useState(false);

  const login = async (e) => {

    e.preventDefault();
  
    //connect to api 

     setLoader(true);
   
    try {
    
      const getLogin = await axios.post(`${props.url}/api/login`, {
          "username" : user,
          "password" : password
        });

      setLoader(false);

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

  
    return await axios.put(`${props.url}/api/user/${_id}`,{ online: true});
     
  }




  return (
  
     <div className="App-header" >
      <Container>
        <Row>

          <Col md={{ span: 3, offset: 4 }}>

            <h5 style={{textAlign:"center"}}>Login in Chat</h5>



            <div style={{width: '100%'}} className="mb-3">
             <BarLoader sizeUnit={"px"} size={20} width={255} color={'#61dafb'}  loading={loader} /> 
            </div>



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
               
               <p style={{marginTop:'10px', fontSize:'14px', textAlign:"center", color:"#fff"}}>
                  Don't have an account?  <Link to="/register" className="link" >Create One</Link>
              </p>
               
              
            </Form>
          </Col>
        </Row>

      </Container>
      </div>
  );
}




