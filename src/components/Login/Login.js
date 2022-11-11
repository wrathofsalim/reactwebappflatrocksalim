import { useNavigate } from "react-router-dom";
import { isAuth } from "../../hoc/isAuth";
import React, { useState } from "react"
import { useAuthContext } from '../../contexts/AuthContext';
import * as authService from "../../services/AuthenticationService"
import Forbidden from "../Forbidden/Forbidden";
import { useNotification } from "../../contexts/NotificationContext";
import Alert from "../Alerts/Alerts";

const Login = () => {
    const dispatch = useNotification();

    const handleNewNotification = (type, msg, title, time) => {
        dispatch({
            type: type,
            message: msg,
            title: title,
            time: time
        })
    }

    const { login, user } = useAuthContext();
    const navigate = useNavigate();

    //USERNAME VALIDATIONS
    const [username, SetUsername] = useState("")
    const [usernameValid, SetUsernameValid] = useState(true);


    const handleUsername = (e) => {
        const regex = new RegExp("^[a-zA-Z]{0,32}$")
        let _username = e.target.value.toLowerCase().trim()
        SetUsernameValid(true);
        let isMatch = _username.match(regex);
        if (!isMatch) {
            SetUsernameValid(false);
        } else if (isMatch) {
            SetUsername(_username);
        }
    }

    const [password, SetPassword] = useState("")
    const onLoginHandler = (e) => {

        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let username = formData.get('username');
        let password = formData.get('password');

        authService.login(username, password)
            .then((authData) => {
                if (authData.userModel.isActive == false) {
                    handleNewNotification(
                        "error",
                        "Account has been temporarily disabled. For more information contact customer services or check your e-mail address",
                        "Error",
                        50
                    );
                } else {
                    login(authData);
                    handleNewNotification(
                        "success",
                        "Logged in as, " + username,
                        "Logged in!",
                        10
                    );
                    navigate('/MainBanner');
                }
            })
            .catch(err => {
                handleNewNotification(
                    "error",
                    "Wrong username or password.",
                    "Error",
                    20
                );
            })
    }

    const LoginAdmin = (e) => {
        e.preventDefault();
        let username = 'admin';
        let password = 'Test12#$';

        authService.login(username, password)
            .then((authData) => {
                if (authData.userModel.isActive == false) {
                    handleNewNotification(
                        "error",
                        "Account has been temporarily disabled. For more information contact customer services or check your e-mail address",
                        "Error"
                    );
                } else {
                    login(authData);
                    navigate('/MainBanner');
                }
            })
            .catch(err => {
                handleNewNotification(
                    "error",
                    "Something went wrong.",
                    "Error"
                );
            })
    }
    const LoginCustomer = (e) => {
        e.preventDefault();
        let username = 'customer';
        let password = 'Test12#$';

        authService.login(username, password)
            .then((authData) => {
                if (authData.userModel.isActive == false) {
                    handleNewNotification(
                        "error",
                        "Account has been temporarily disabled. For more information contact customer services or check your e-mail address",
                        "Error"
                    );
                } else {
                    login(authData);
                    navigate('/MainBanner');
                }
            })
            .catch(err => {
                handleNewNotification(
                    "error",
                    "Something went wrong.",
                    "Error"
                );
            })
    }
    const LoginEmployee = (e) => {
        e.preventDefault();
        let username = 'employee';
        let password = 'Test12#$';

        authService.login(username, password)
            .then((authData) => {
                if (authData.userModel.isActive == false) {
                    handleNewNotification(
                        "error",
                        "Account has been temporarily disabled. For more information contact customer services or check your e-mail address",
                        "Error"
                    );
                } else {
                    login(authData);
                    navigate('/MainBanner');
                }
            })
            .catch(err => {
                handleNewNotification(
                    "error",
                    "Something went wrong.",
                    "Error"
                );
            })
    }

    return (
        (user.userRoles == "Customer" || user.userRoles == "Employee" || user.userRoles == "Admin")
        &&
        <Forbidden />
        ||
        <>
            <div className="container-fluid ">
                <div className="titlepage">
                    <h2>Login</h2>
                </div>
            </div>
            <form onSubmit={onLoginHandler} method="POST">
                <input type="text" name="username" id='username'
                    className="input col-sm-4"
                    placeholder='username'
                    value={username}
                    onChange={handleUsername} />
                <br />
                {
                    !usernameValid
                    &&
                    <Alert type={"danger"} text={"Username can only contain letters."} />
                }
                <br />
                <br />
                <input type="password" name="password" id="password" className="input col-sm-4" />
                <br />
                <br />
                <br />
                <button type="submit" className="col-sm-4 btn btn-primary ">Sign in</button>
                <br />
                <br />
                <br />
                {/* <button onClick={LoginAdmin} className="col-sm-4 btn btn-primary">Sign as an Admin</button>
                <br />
                <button onClick={LoginCustomer} className="col-sm-4 btn btn-primary">Sign as an Customer</button>
                <br />
                <button onClick={LoginEmployee} className="col-sm-4 btn btn-primary">Sign as an Employee</button> */}

                <br />
                <div className="text-center mb-4">
                    <h2>Not a member? <a href="/Register">Click here to register.</a></h2>
                </div>
            </form>
        </>
    )
}

export default isAuth(Login);