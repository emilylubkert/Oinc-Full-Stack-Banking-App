import '../../components.css';

const UserDetails = ({ user, balance }) => {
    console.log('user', user)
      return (
        <tr>
          <td>{user.displayName}</td>
          <td>{user.email}</td>
          <td>hidden</td>
          <td>${balance}</td>
        </tr>
      );
  };

  export default UserDetails;