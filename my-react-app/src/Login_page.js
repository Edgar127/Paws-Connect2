import React, { useState } from "react";
import {BrowserRouter as 
    Route,Router , Routes} from 'react-router-dom';
import Registration_Form from './Registration_Form';

function Login_page(){
    const[username,setUsername]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would send data to the server
        console.log('Submitted:', { username, email, password });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            <Router>
                <Routes>
                    <Route>
                        path="/Registration_Form"
                        element={<Registration_Form />}
                    </Route>
                </Routes>
            </Router>
        </form>
    );
}
export default Login_page;