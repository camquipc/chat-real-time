
import React, { useState } from 'react';

import { Form, Button, Row} from 'react-bootstrap';
import { FiSend, FiTrash2, FiFrown } from "react-icons/fi";

import axios from 'axios';


export default function SendMessage(props) {

    const [ message, setMessage] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
    
           let mjs = await axios.post(`${props.url}/api/message`, {
                "message": message,
                "userId": localStorage.getItem('user_id')
            },
            {
                 headers: {
                   Authorization: `Bearer ${localStorage.getItem('token')}`
                 }
            }

            );

            setMessage('');

            props.getMessages();
          
          } catch (error) {
            console.log(error);
          }

    };


    return (

        <Form onSubmit={sendMessage} autoComplete="off">
        <Form.Group as={Row} controlId="formPlaintextPassword" >

            <Form.Label column sm="1" className="pt-0">
                <Button variant="outline-light" size="sm" 
                className="outline-light mr-2" style={{ marginTop: '-6px' }}
                title="Send Message">
                    <FiFrown />
                </Button>
            </Form.Label>

            <Form.Label column sm="8" className="p-0">
                <Form.Control size="sm"
                    
                    type="text" placeholder="Comment something"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} 
                />
            </Form.Label>
            <Form.Label column sm="3" className="pt-0">

                <Button variant="outline-dark" size="sm" type="submit" className="outline-dark mr-2" style={{ marginTop: '-6px' }}>
                    <FiSend />
                </Button>

            </Form.Label>
        </Form.Group>
        </Form>
    );
}

