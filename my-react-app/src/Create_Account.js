import React, { useState } from 'react';
import axios from 'axios';
import './Create_Account.css';
function Create_Account() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const handleCreateAccount = () => {
        // Check if username, password, or email is empty
        if (!username || !password || !email) {
            setErrorMessage('All fields are required.');
            return;
        }
        // Make API call to create account
        axios.post('/api/Create_Account', { username, password, email })
            .then(response => {
                // Account created successfully
                console.log('Account created:', response.data);
                // Clear form fields
                setUsername('');
                setPassword('');
                setEmail('');
                setErrorMessage('');
                // Show success message or redirect user
            })
            .catch(error => {
                // Handle errors (e.g., username already taken)
                setErrorMessage(error.response.data.message);
            });
    };
    return (
        <div className="create-account-container">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="create-account-button" onClick={handleCreateAccount}>Create Account</button>
        </div>
    );
}
export default Create_Account;