import { createContext, useContext, useState } from 'react';
import firebase from './firebaseConfig';
import { navigate, useNavigate } from 'react-router-dom';

import useProvideAuth from '../../hooks/useProvideAuth';
import { usersAPI } from '../../services/index';

const authContext = createContext(null);

function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    const signup = async (email, password) => {
        try {
            const userCredential = await firebase.signup(email, password)
            console.log('userCredential', userCredential);
            const { user } = userCredential;

            user.getIdToken().then(token => {
                localStorage.setItem('token', token)
                console.log('token', token)
            })
            setAuth(user);
            // auth.balance = 10;
            // navigate('/dashboard');

        } catch (error){
            console.log(error)
        }
    }

    const login = async (email, password) => {
        try {
            const userCredential = await firebase.login(email, password);
            console.log('log in', userCredential);
            const { user } = userCredential;

            user.getIdToken().then(token => {
                localStorage.setItem('token', token)
            })
            setAuth(user);
            // auth.balance = 10;
            // navigate('/dashboard');

        } catch (error){
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            await firebase.logout();
            setAuth(null);
            localStorage.removeItem('token');
            navigate('/');
        } catch {

        }
    }
    
    return (
        <authContext.Provider value={{auth, setAuth, signup, login, logout}} >
            {children}
        </authContext.Provider>
    )
}

function useAuth() {
    return useContext(authContext);
}

export { AuthProvider, useAuth };