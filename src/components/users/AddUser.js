import React, { useState } from 'react';
import '../../styles/user_css/AddUser.css';
import humanIcon from '../../styles/images/human_icon.png';
import passwordIcon from '../../styles/images/password.png';
import pencilIcon from '../../styles/images/pencil.png';
import { Button } from '../Button';
import { useUserManagement } from '../../contexts/UserContext';
import Modal from '../Modal.js'; // Adjust the import path as necessary

const AddUser = ( {showTitle, buttonText},) => {
  const { addUser, user, fetchUserByUsername, isLoading } = useUserManagement();


  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [region, setRegion] = useState('Horsens North'); // Default to first option
  const [password, setPassword] = useState(user ? user.password : "");
  const [repeatPassword, setRepeatPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const USER_ROLE = "Garbage Collector";
  const [newUsername, setNewUsername] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newRegion, setNewRegion] = useState('Horsens North'); // Default to first option
  
  


  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  async function handleAddUser() {
    if (!username || !fullName || !region || !password || !repeatPassword) {
      showModal('Please fill in all fields.');
      return;
    }

    if (password !== repeatPassword) {
      showModal('Passwords do not match. Please re-enter your passwords.');
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
      showModal(`Successfully signed up: ${username}`);
      // Reset form after successful signup
      setUsername('');
      setFullName('');
      setRegion('Horsens North'); // Reset to the default value
      setPassword('');
      setRepeatPassword('');
    } catch (error) {
      showModal(error.message);
    }
  }

  return (
    <div className="adduser-page-container">
      <div className="adduser-background"></div>
      <div className="adduser-content">
        <div className="adduser-form-container">
          <div className="adduser-header">
            <div className="adduser-title">{showTitle}</div>
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
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="region-select"
            >
              <option value="Horsens North">Horsens North</option>
              <option value="Horsens South">Horsens South</option>
              <option value="Horsens East">Horsens East</option>
              <option value="Horsens West">Horsens West</option>
            </select>
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
          <Button onClick={handleAddUser} disabled={isLoading} className="adduser-signup-btn">
            {isLoading ? 'Signing up' : buttonText}
          </Button>



        </div>
      </div>
      <Modal isOpened={isModalOpen} onClose={closeModal}>
        {modalMessage}
      </Modal>
    </div>
  );
};

export { AddUser };