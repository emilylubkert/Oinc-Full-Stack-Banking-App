import { createContext, useContext, useState } from 'react';
import { navigate, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import firebase from './firebaseConfig';
import useProvideAuth from '../../hooks/useProvideAuth';
import { usersAPI } from '../../services/index';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    const signup = async (name, email, password) => {
        try {
            const userCredential = await firebase.signup(email, password)
            console.log('userCredential', userCredential);
            const { user } = userCredential;
            const firebaseID = user.uid;
            updateProfile(user, { displayName: name })
            console.log(user.displayName); 

            user.getIdToken().then(token => {
                localStorage.setItem('token', token)
                console.log('token', token)
            })
            setAuth(user);
            usersAPI.new({name, email, password, firebaseID});
            await firebase.login(email, password);
            navigate('/dashboard');
            
        } catch (error){
            console.log(error)
        }
    }

    const login = async (email, password) => {
        try {
            const userCredential = await firebase.login(email, password);
            console.log('log in', userCredential);
            const { user } = userCredential;
            console.log(user.displayName); 

            user.getIdToken().then(token => {
                localStorage.setItem('token', token)
            })
            setAuth(user);
            console.log('user', user)
            navigate('/dashboard');

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
        <AuthContext.Provider value={{auth, setAuth, signup, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth, AuthContext };