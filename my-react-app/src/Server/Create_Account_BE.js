const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { addUserDataToDatabase } = require('./profile');
const axios = require('axios'); 

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Zrc19941210',
  database: 'profile'
});

// connection.connect(err => {
//   if (err) throw err;
//   console.log('Connected to the MySQL server.');
// });

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});



app.use(bodyParser.json());

function userExists(username, email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Profile WHERE Name = ? OR Email = ? LIMIT 1';
    connection.query(query, [username, email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

// app.post('/api/create_account', (req, res) => {
//   const { username, email, password } = req.body;

//   const query = 'INSERT INTO UserProfile (name, Email, Password) VALUES (?, ?, ?)';
//   connection.query(query, [username, email, password], (error, results) => {
//     if (error) {
//       console.error('Error creating account:', error);
//       res.status(500).json({ error: 'An error occurred while creating the account.' });
//     } else {
//       console.log('Account created successfully:', results);
//       res.json({ message: 'Account created successfully.' });
//     }
//   });
// });



axios.post('/api/Create_Account', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the username or email is already taken
    const exists = await userExists(username, email);
    if (exists) {
      return res.status(409).send('Username or email already taken');
    }

   
    await addUserDataToDatabase({ username, password, email });
    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Error registering user');
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const query = 'SELECT * FROM Profile WHERE Name = ? AND Password = ? LIMIT 1';
    connection.query(query, [username, password], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        return res.status(500).send('Error logging in');
      }

      if (results.length === 0) {
        return res.status(401).send('Invalid username or password');
      }

      res.status(200).send('Login successful');
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error logging in');
  }
});

app.post('/api/create_profile', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email is already taken
    const exists = await userExists(username, email);
    if (exists) {
      return res.status(409).send('Username or email already taken');
    }

    // If not, insert the new user profile into the database
    const query = 'INSERT INTO Profile (Name, Email, Password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (error, results) => {
      if (error) {
        console.error('Error creating profile:', error);
        return res.status(500).send('An error occurred while creating the profile.');
      }
      console.log('Profile created successfully:', results);
      res.status(200).json({ message: 'Profile created successfully.' });
    });
  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).send('Error creating profile');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

