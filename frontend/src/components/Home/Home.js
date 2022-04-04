import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth/authContext';
import Card from '../Card';
import ContactButton from './ContactButton';
import Logo from './Logo';
import '../../components.css';

function Home() {
  const auth = useAuth();
  return (
    <Logo>
      <Card
        txtcolor='black'
        header='WELCOME TO OIN¢'
        text={!auth.auth ? ('Tooth fairy coins,  money from grandma...') : null}
        body={
          !auth.auth ? (
            <>
              <p>OIN¢ helps keep track of it all.</p>
              <p>Let's get started.</p>
              <div className='btn-container'>
                <Link
                  className='btn btn-info btn-lg'
                  role='button'
                  to='../createaccount'
                >
                  Create Account
                </Link>
                <Link
                  className='btn btn-info btn-lg'
                  role='button'
                  to='../login'
                >
                  Log In
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className='home-text'>See your account details.</p>
              <Link
                className='btn btn-info btn-lg home'
                role='button'
                to='../dashboard'
              >
                Dashboard
              </Link>
              <p className='home-text'>Add money.</p>
              <Link
                className='btn btn-info btn-lg home'
                role='button'
                to='../deposit'
              >
                Deposit
              </Link>
              <p className='home-text'>Take out money.</p>
              <Link
                className='btn btn-info btn-lg home'
                role='button'
                to='../withdraw'
              >
                Withdraw
              </Link>
            </>
          )
        }
      />
      <ContactButton />
    </Logo>
  );
}

export default Home;
