import React, { useState } from 'react';
import './User_Profile.css';

function User_Profile() {
  const [user, setUser] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    bio: 'This is a bio',
    dogs: [] 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value, 
    });
  };

  const handleAddDog = () => {
    setUser({
      ...user,
      dogs: [...user.dogs, `Dog ${user.dogs.length + 1}`], 
    });
  };

  return (
    <div className="user-profile">
      <h2>Welcome back, {user.username}!</h2>
      <form>
        <label>
          Username:
          <input type="text" name="username" value={user.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Bio:
          <textarea name="bio" value={user.bio} onChange={handleChange} />
        </label>
        <br />
        <button type="button" onClick={handleAddDog}>Add a Dog</button>
      </form>
      {user.dogs.length > 0 && (
        <div>
          <h3>My Dogs:</h3>
          <ul>
            {user.dogs.map((dog, index) => (
              <li key={index}>{dog}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default User_Profile;
