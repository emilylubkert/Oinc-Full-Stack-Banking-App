import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/Auth/authContext';
import '../components.css';

function NavBar() {
  const { auth, logout } = useAuth();

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light'>
        <NavLink
          className={({ isActive }) =>
            (isActive ? 'active-style' : 'none') + 'navbar-brand'
          }
          exact='true'
          to='/'
          data-toggle='tooltip'
          data-placement='top'
          title='Return to home page'
        >
          oinc Home
        </NavLink>
        <button
          className='custom-toggler navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarsExample09'
          aria-controls='navbarsExample09'
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label='Toggle navigation'
          onClick={handleNavCollapse}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
          id='navbarNav'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'active-style' : 'none' + 'nav-NavLink'
                }
                to='/createaccount'
                data-toggle='tooltip'
                data-placement='top'
                title='Make a new account'
              >
                Create Account
              </NavLink>
            </li>
            <li className='nav-item'>
              {!auth ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'active-style' : 'none' + 'nav-NavLink'
                  }
                  to='/login'
                  data-toggle='tooltip'
                  data-placement='top'
                  title='Log in to your account'
                >
                  Login
                </NavLink>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'active-style' : 'none' + 'nav-NavLink'
                  }
                  onClick={logout}
                  to='/'
                  data-toggle='tooltip'
                  data-placement='top'
                  title='Log out of your account'
                >
                  Logout
                </NavLink>
              )}
            </li>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'active-style' : 'none' + 'nav-NavLink'
                }
                to='/dashboard'
                data-toggle='tooltip'
                data-placement='top'
                title='View recent transactions'
              >
                Dashboard
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'active-style' : 'none' + 'nav-NavLink'
                }
                to='/deposit'
                data-toggle='tooltip'
                data-placement='top'
                title='Make a deposit'
              >
                Deposit
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'active-style' : 'none' + 'nav-NavLink'
                }
                to='/withdraw'
                data-toggle='tooltip'
                data-placement='top'
                title='Withdraw funds'
              >
                Withdraw
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'active-style' : 'none' + 'nav-NavLink'
                }
                to='/userprofile'
                data-toggle='tooltip'
                data-placement='top'
                title='See user info'
              >
                User Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
