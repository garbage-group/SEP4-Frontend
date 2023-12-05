import React, { useState } from 'react';
import '../../styles/user_css/AddUser.css';
import humanIcon from '../../styles/images/human_icon.png';
import passwordIcon from '../../styles/images/password.png';
import pencilIcon from '../../styles/images/pencil.png';
import { Button } from '../Button';
import { useUserManagement } from '../../contexts/UserContext';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [region, setRegion] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const USER_ROLE = "Garbage Collector"; // Define a constant role
  const { addUser, isLoading } = useUserManagement();

  async function handleAddUser() {
    if (!username || !fullName || !region || !password || !repeatPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== repeatPassword) {
      alert('Passwords do not match. Please re-enter your passwords.');
      return;
    }

    const userData = {
      username,
      fullName,
      password,
      role: USER_ROLE,
      region
    };

    try {
      await addUser(userData);
      alert(`Successfully signed up: ${username}`);
      // Reset form after successful signup
      setUsername('');
      setFullName('');
      setRegion('');
      setPassword('');
      setRepeatPassword('');
    } catch (error) {
      alert('Failed to sign up user. Please try again.');
    }
  }

  return (
    <div className="adduser-page-container">
      <div className="adduser-background"></div>
      <div className="adduser-content">
        <div className="adduser-form-container">
          <div className="adduser-header">
            <div className="adduser-title">Add New User</div>
          </div>
          <div className="adduser-inputs">

            <img src={humanIcon} alt="Username Icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-text">
            <img src={humanIcon} alt="Full Name Icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-text">
            <img src={pencilIcon} alt="Region Icon" />
            <input
              type="text"
              placeholder="Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>

          <div className="input-text">
            <img src={passwordIcon} alt="Password Icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-text">
            <img src={passwordIcon} alt="Repeat Password Icon" />
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleAddUser} disabled={isLoading} className="adduser-signup-btn">
          {isLoading ? 'Signing up...' : 'Sign up'}
        </Button>
      </div>
    </div>
  );
};

export { AddUser };
