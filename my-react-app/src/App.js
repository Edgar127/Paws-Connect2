import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Create_Account from './Create_Account';  // Assuming CreateAccount.js is in the same directory
import axios from 'axios';
// Set base URL for axios
axios.defaults.baseURL = 'http://localhost:3000'; // Assuming your backend server is running on port 3000
ReactDOM.render(
  <React.StrictMode>
    <Create_Account />
  </React.StrictMode>,
  document.getElementById('root')
);
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PetPaws</h1>
        <Create_Account />
      </header>
    </div>
  );
}
export default App;