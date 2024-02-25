import React, { useState } from 'react';
import axios from 'axios';


function Login()
{
    const [username, setUsername] = useState('');
    const [password, setPassword]= useState('')
    const[email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => 
    {

        axios.post('/api/Login', { username, password, email })
        .then(response => {
            // Successful login
            console.log('Logged in:', response.data);
            // Redirect user or show success message
        })
        .catch(error => {
            // Handle login errors
            setErrorMessage(error.response.data.message);
        });
};

return (
    <div className="login-container">
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );

}
export default Login;