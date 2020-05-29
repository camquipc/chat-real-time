import React , {useState , useEffect } from 'react';

import { Media } from 'react-bootstrap';
import axios from 'axios';

import moment from 'moment';

import { emojify } from 'react-emojione';


export default function Messages(props) {



  return (

    <>
     {
    props.messages.length === 0  ? <p>Welcome to chat, comment something</p>:


    <ul className="list-unstyled">

      { 
  
        props.messages.filter( m => moment(m.createdAt).format('D') === moment().format('D')).map((message, i) => {
           let  id = message.userId._id;
          return (

            
             ( id  !== localStorage.getItem('user_id') ) ? 

              <Media as="li" key={i} className="mb-2">
              
                <Media.Body>
                   <span className="username"> -- { message.userId.username } --</span>
                  <div className="message" >
                    <p >{ emojify( message.message , {output: 'unicode'})}</p>
                    <div className="time"> {moment(message.createdAt ).format('HH:mm:a')}</div>
                  </div>
                </Media.Body>
              </Media>
              :  
              <Media as="li" className="mb-2 " key={i} > 
              <Media.Body>
                <div className="message_user_id" >
                <p > { emojify(message.message ,  {output: 'unicode'})} </p>
                <div className="time"> {moment(message.createdAt ).format('HH:mm:a')}</div>
                </div>
              </Media.Body>
            </Media> 
          )

        })
      }

     

    </ul>
  }
    </>
  );
}

