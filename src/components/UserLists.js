
import React from 'react';

import { Media, Badge, Card } from 'react-bootstrap';



export default function UserLists(props) {

    const { users } = props;

    return (

        <ul className="list-unstyled" >
            {
                users.filter(u => u._id !== localStorage.getItem('user_id')).map((user, i) => {

                    return (
                        <Media as="li" key={i} className="mb-2">
                            <img width={24} height={24} className="mr-3" src={user.avatar} />
                            <Media.Body>
                             <div style={{position:'relative'}}>
                             
                                <h6  className="mt-1" style={{textTransform: "capitalize"}}>{user.username}</h6>
                                {(user.online === true) ? <span className="online" ></span> : ''}
                                </div>
                            </Media.Body>
                        </Media>
                    );

                })
            }

        </ul>
    );
}
