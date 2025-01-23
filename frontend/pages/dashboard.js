import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const decoded = jwt_decode(token);
        axios.get(`http://localhost:5000/api/users/${decoded.id}`)
            .then(res => setUser(res.data));
    }, []);

    return user ? (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Phone: {user.phone}</p>
            <p>Subscription Ends: {user.subscription_end}</p>
        </div>
    ) : <p>Loading...</p>;
}
