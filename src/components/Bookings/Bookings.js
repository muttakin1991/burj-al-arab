import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [booking, setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    useEffect(() => {
        fetch('http://localhost:5000/booking?email='+loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            
        })
        .then( res => res.json())
        .then( data => setBooking(data));
    }, [])
    return (
        <div>
           <h3>You have: {booking.length}</h3>
           {
               booking.map(book => <li>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} To:{(new Date(book.CheckOut).toDateString('dd/MM/yyyy'))}</li>)
           }
        </div>
    );
};

export default Bookings;