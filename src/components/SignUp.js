
import React, { useState } from 'react';
import '../styles/SignUp.css';

import humanIcon from '../styles/images/human_icon.png';
import passwordIcon from '../styles/images/password.png';
import pencilIcon from '../styles/images/pencil.png';
import { Button } from '../components/Button';


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [region, setRegion] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
  
    function handleSignUp() {

      if (!username || !fullName || !region || !password || !repeatPassword) {
        alert('Please fill in all fields.');
        return;
      }
 
      if (username === 'existingUsername') {
        alert('Username already exists. Please choose a different username.');
        return;
      }

      if (password !== repeatPassword) {
        alert('Passwords do not match. Please re-enter your passwords.');
        return;
      }
      
      alert(`Successfully signed up: ${username}`);
    
    }
  
    return (
      <div className="page-container">
        <div className="background-container"></div>
        <div className="content-container">
          <div className="container">
            <div className="header">
              <div className="text">Add new garbage colector</div>
            </div>
            <div className="inputs">
            <div className="input">
          <img src={humanIcon} alt="Username Icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={humanIcon} alt="Full Name Icon" />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={pencilIcon} alt="Region Icon" />
          <input
            type="text"
            placeholder="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={passwordIcon} alt="Password Icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={passwordIcon} alt="Repeat Password Icon" />
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
            </div>
            <Button onClick={handleSignUp} className="signIn">
            Sign up</Button>
          </div>
        </div>
      </div>
    );
  };
  

export default SignUp;
