import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create_Account from './Create_Account';
import Login from './Login';

function MainComponent() {
    const [accountCreated, setAccountCreated] = useState(false);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/create-account">
                        <Create_Account onSuccess={() => setAccountCreated(true)} />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        {accountCreated ? (
                            <Login />
                        ) : (
                            <Create_Account onSuccess={() => setAccountCreated(true)} />
                        )}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default MainComponent;