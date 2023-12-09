import React, { useState } from 'react';
import '../../styles/user_css/UpdateUser.css'; // Adjust the import path as necessary
import pencilIcon from '../../styles/images/pencil.png';
import { Button } from '../Button.js';
import { useUserManagement } from '../../contexts/UserContext';
import Modal from '../Modal.js';

const UpdateUser = ({ user, onCancel, onUpdate }) => {
    const [updatedFullName, setUpdatedFullName] = useState(user.fullName);
    const [isModalOpen, setIsModalOpen] = useState(true); // Open the modal by default
    const { changeUserData, isLoading } = useUserManagement();
  
    const closeModal = () => {
      setIsModalOpen(false);
      onCancel(); // Call the onCancel callback to inform the parent component about the cancel action
    };
  
    async function handleUpdateUser() {
      if (!updatedFullName) {

        alert('Please fill in the Full Name field.');
        return;
      }
  
      const updatedUserData = {
        fullName: updatedFullName,
        // Add more fields if needed
      };
  
      try {
        // Use the username instead of the user ID for updating user data
        await changeUserData(user.username, updatedUserData);
        alert(`Successfully updated user: ${user.username}`);
        // Call the onUpdate callback to inform the parent component about the update
        onUpdate(user.username, updatedUserData);
        // Close the modal after a successful update
        closeModal();
      } catch (error) {
        alert(`Error updating user: ${error.message}`);
      }
    }
  
    return (
      <div className="updateuser-container">
        <div className="updateuser-form-container">
          <div className="updateuser-header">
            <div className="updateuser-title">Update User</div>
          </div>
          <div className="updateuser-inputs">
            <div className="input-text">
              <img src={pencilIcon} alt="Full Name Icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={updatedFullName}
                onChange={(e) => setUpdatedFullName(e.target.value)}
              />
            </div>
  
            {/* Add more input fields if needed */}
          </div>
  
          <Button onClick={handleUpdateUser} disabled={isLoading} className="updateuser-update-btn">
            {isLoading ? 'Updating' : 'Update User'}
          </Button>
  
          <Button onClick={closeModal} className="updateuser-cancel-btn">
            Cancel
          </Button>
        </div>
      </div>
    );
  };
  
  export { UpdateUser };