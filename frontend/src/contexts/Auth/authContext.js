import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import firebase from './firebaseConfig';
import { usersAPI } from '../../services/index';

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    const signup = async (name, email, password) => {
        try {
            const userCredential = await firebase.signup(email, password)
            const { user } = userCredential;
            const firebaseID = user.uid;
            updateProfile(user, { displayName: name })

            user.getIdToken().then(token => {
                localStorage.setItem('token', token)
            })
            setAuth(user);
            usersAPI.new({name, email, password, firebaseID});
            await firebase.login(email, password);
            
        } catch (error){
            console.log(error)
        }
    }

    const login = async (email, password) => {
        try {
            const userCredential = await firebase.login(email, password);
            const { user } = userCredential;

            user.getIdToken().then(token => {
                localStorage.setItem('token', token)
            })
            setAuth(user);
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
        } catch (error){
            console.log(error);
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