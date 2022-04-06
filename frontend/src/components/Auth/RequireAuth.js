import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth/authContext'

function RequireAuth() {
    const auth = useAuth();
    let location = useLocation();

    if (!auth.auth){
        return <Navigate to='/' state={{ from: location}} />
    }
    return <Outlet />;
}

export default RequireAuth;