const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { addUserDataToDatabase } = require('./profile'); 

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ranga1Kira',
  database: 'profile'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

app.use(bodyParser.json());

// Convert userExists to use Promises for better async/await integration
function userExists(username, email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1';
    connection.query(query, [username, email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

// Corrected route handler
app.post('/api/Create_Account', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the username or email is already taken
    const exists = await userExists(username, email);
    if (exists) {
      return res.status(409).send('Username or email already taken');
    }

    // Proceed with adding user data to database
    // Make sure to hash the password before storing it
    await addUserDataToDatabase({ username, password, email });
    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Error registering user');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
