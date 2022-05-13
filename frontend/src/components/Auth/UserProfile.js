import { useState, useEffect } from 'react';
import Card from '../Card';
import { useAuth } from '../../contexts/Auth/authContext';
import UserDetails from './UserDetails';
import ContactButton from '../Home/ContactButton';
import { transactionsAPI } from '../../services/index.js'
import '../../components.css';

function UserProfile() {
  const auth = useAuth();

  const [currentBalance, setCurrentBalance] = useState('loading');

  const getBalance = async () => {
    const response = await transactionsAPI.balance(auth.auth?.uid);
    setCurrentBalance(response.data.balance);
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <Card
        className='userProfile-card'
        bg-color='light'
        txtcolor='black'
        header={`Welcome ${auth.auth?.displayName}`}
        title='See below for your user information.'
      />
      <table className='user-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Account Balance</th>
          </tr>
        </thead>
        <tbody>
          <UserDetails user={auth.auth} balance={currentBalance} />
        </tbody>
      </table>
      <ContactButton />
    </>
  );
}

export default UserProfile;
