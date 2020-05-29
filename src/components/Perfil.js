import React from 'react';

import { Media } from 'react-bootstrap';
import { FiLogIn } from "react-icons/fi";

export default function Perfil(props) {

  return (
    <Media className="mb-4">
        <img width={44} height={44} className="mr-3" src={props.user.avatar}/>
        <Media.Body>
            <h6 className="mt-3" style={{textTransform: "capitalize"}}>{props.user.username}</h6>
            <spam className="logout" onClick={() => props.logout()} title="Logout"> <FiLogIn /> </spam>
        </Media.Body>
    </Media>
  );
}
