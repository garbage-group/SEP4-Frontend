//Verifying that the addUser function provided by the context can be invoked

import React from 'react';
import { render, act } from '@testing-library/react';
import { UserManagementProvider, useUserManagement } from '../contexts/UserContext';

// Helper component to use the context
const TestComponent = () => {
    const { addUser } = useUserManagement();

    return (
        <button onClick={() => addUser({ username: 'testuser' })}>Add User</button>
    );
};

describe('UserManagementContext', () => {
    it('provides addUser function', async () => {
        const { getByText } = render(
            <UserManagementProvider>
                <TestComponent />
            </UserManagementProvider>
        );

        await act(async () => {
            getByText('Add User').click();
        });

        // Test passes if no errors are thrown during the click
    });
});