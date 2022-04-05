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
        header={!auth.auth ? 'WELCOME TO OIN¢' : `Hi ${auth.auth?.displayName}`}
        text={!auth.auth ? 'Tooth fairy coins,  money from grandma...' : null}
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
            <Link
              className='btn btn-info btn-lg'
              role='button'
              to='../dashboard'
            >
              Go To Dashboard
            </Link>
          )
        }
      />
      <ContactButton />
    </Logo>
  );
}

export default Home;
