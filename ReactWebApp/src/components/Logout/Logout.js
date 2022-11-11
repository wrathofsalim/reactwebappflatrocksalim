import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/AuthenticationService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCartContext } from '../../contexts/CartContext';
import * as chatHub from "../ChatHub/ChatHub"

const Logout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthContext();
    const { clear } = useCartContext();
    // chatHub.closingConnection()

    authService.logout(user.accessToken)
        .then(() => {
            logout();
            clear();
            navigate('/MainBanner');
        })
        .catch(err =>
            console.log(err)
        )
    return null;
};

export default Logout;