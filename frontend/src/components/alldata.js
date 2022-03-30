import { useState, useEffect } from 'react';
import { useUsers } from '../contexts/userContext';
import { useAuth } from '../contexts/Auth/authContext';
import { usersAPI } from '../services/index';
import Card from './Card';
import '../components.css';

function AllData() {
  const ctx = useUsers();
  const [data, setData] = useState([]);
  const auth = useAuth();

  const UserList = ({ users }) => {
    const newRow = users.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
          <td>{`$${item.balance}`}</td>
        </tr>
      );
    });
    return newRow;
  };
  //extract to service
  useEffect(() => {
    usersAPI.all().then((response) => {
      console.log(response.data);
      setData(response.data);
      console.log('data', data);
      console.log('auth', auth.uid)
    });
  }, []);

  return (
    <>
      <Card
        txtcolor='black'
        header='User Data'
        body={
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
              <UserList users={data} />
            </tbody>
          </table>
        }
      />
    </>
  );
}

export default AllData;
