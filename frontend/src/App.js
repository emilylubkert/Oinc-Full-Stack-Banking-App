import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home/Home';
import Contact from './components/Home/Contact';
import Login from './components/Auth/Login';
import CreateAccount from './components/Auth/Createaccount';
import Dashboard from './components/Transactions/Dashboard';
import Deposit from './components/Transactions/Deposit';
import Withdraw from './components/Transactions/Withdraw';
import RequireAuth from './components/Auth/RequireAuth';
import { AuthProvider } from './contexts/Auth/authContext';
import { AuthStateChanged } from './components/Auth/AuthStateChanged';


function App() {
  
  return (
    <Router>
        <AuthProvider>
          <AuthStateChanged>
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
              </Route>

            </Routes>
          </div>
          </AuthStateChanged>
        </AuthProvider>
    </Router>
  );
}

export default App;
