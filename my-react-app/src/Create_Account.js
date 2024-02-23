import React, { useState } from 'react';
import axios from 'axios';

function Create_Account() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    

    const handleCreateAccount = () => {
        // Check if username or password is empty
        if (!username || !password) {
            setErrorMessage('All fields are required.');
            return;
        }

        // Make API call to create account
        axios.post('/api/create_account', { username, password })
            .then(response => {
                // Account created successfully
                console.log('Account created:', response.data);
                // Clear form fields
                setUsername('');
                setPassword('');            
                setErrorMessage('');
                setFullName('');
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
        <div>
            <h2>Create Account</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={handleCreateAccount}>Create Account</button>
        </div>
    );
}

export default Create_Account;
