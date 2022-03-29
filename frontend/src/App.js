import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Transactions/dashboard';
import CreateAccount from './components/Auth/createaccount';
import Deposit from './components/Transactions/deposit';
import Home from './components/home';
import NavBar from './components/NavBar';
import Login from './components/Auth/login';
import Withdraw from './components/Transactions/withdraw';
import AllData from './components/alldata';
import RequireAuth from './components/Auth/RequireAuth';
import { AuthProvider } from './contexts/Auth/authContext';
import { UserProvider } from './contexts/userContext';
import Contact from './components/contact';

function App() {
  const [data, setData] = useState(null);

  // const callbackendAPI = async () => {
  //   await fetch('/express_backend')
  //   .then((res) => res.json())
  //   .then((res) => console.log(res.message));}

  // useEffect(() => callbackendAPI(), []);

  return (
    <Router>
      <UserProvider>
        <AuthProvider>
          <NavBar />
          <div className='container' style={{ padding: '20px' }}>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/CreateAccount/' element={<CreateAccount />} />
              <Route path='/login/' element={<Login />} />
              <Route path='*' exact element={<h4>Page Not Found</h4>} />
              <Route path='/contact/' element={<Contact />} />
              <Route element={<RequireAuth />}>
                <Route path='/dashboard/' element={<Dashboard />} />
                <Route path='/deposit/' element={<Deposit />} />
                <Route path='/withdraw/' element={<Withdraw />} />
                <Route path='/alldata/' element={<AllData />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </UserProvider>{' '}
    </Router>
  );
}

export default App;
