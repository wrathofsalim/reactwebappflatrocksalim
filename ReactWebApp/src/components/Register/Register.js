import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import * as authService from '../../services/AuthenticationService';
import { useAuthContext } from '../../contexts/AuthContext';
import Alert from '../Alerts/Alerts';
import * as userServices from '../../services/UserService';
import { useEffect } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [allUsers, SetAllUsers] = useState([])
    useEffect(() => {
        userServices.getAll()
            .then(res => {
                SetAllUsers(res)
            });
    }, [])

    //USERNAME VALIDATIONS
    const [username, SetUsername] = useState("")
    const [usernameTaken, SetUsernameTaken] = useState(false);
    const [usernameValid, SetUsernameValid] = useState(true);
    const handleUsername = (e) => {
        const _username = e.target.value.toLowerCase().trim()

        const regex = new RegExp("^[a-zA-Z]{4,}$")
        SetUsernameTaken(false);
        SetUsernameValid(true);
        SetUsername(_username);

        if (!_username.match(regex)) {
            SetUsernameValid(false);
        }

        allUsers.forEach(element => {
            if (_username == element.userName.toLowerCase()) SetUsernameTaken(true);
        });

    }

    //EMAIL VALIDATIONS
    const [email, SetEmail] = useState("")
    const [emailTaken, SetEmailTaken] = useState(false)
    const [emailValid, SetEmailValid] = useState(true)

    const handleEmail = (e) => {
        const regex = new RegExp('^[a-zA-Z0-9-\.]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]{2,4}$');
        const _email = e.target.value.toLowerCase().trim()

        SetEmailTaken(false);
        SetEmailValid(true);
        SetEmail(_email);
        if (!_email.match(regex)) {
            SetEmailValid(false);
        }

        allUsers.forEach(element => {
            if (_email == element.email.toLowerCase()) SetEmailTaken(true);

        })
    }

    //PASSWORD VALIDATIONS
    const [password, SetPassword] = useState("")
    const [passwordValid, SetPasswordValid] = useState(true)
    const handlePassword = (e) => {
        const _password = e.target.value;

        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[A-Za-z0-9!@#$%^&*()]{8,}$");

        SetPassword(_password)
        if (_password.match(regex)) {
            SetPasswordValid(true);
        }
    }
    const [repeatPassword, SetRepeatPassword] = useState("")
    const [repeatPasswordValid, SetRepeatPasswordValid] = useState(true)

    const handleRepeatPassword = (e) => {
        const _password = e.target.value;
        SetRepeatPassword(_password)
        SetRepeatPasswordValid(false);
        if (_password == password) {
            SetRepeatPasswordValid(true);
        }
    }

    const registerSubmitHandler = (e) => {
        e.preventDefault();
        let { username, email, password } = Object.fromEntries(new FormData(e.currentTarget));
        if (username == "" || username == null) {
            return SetUsernameValid(false)
        }
        if (usernameTaken == true || emailTaken == true) {
            return;
        }
        if (email == "" || email == null) {
            return SetEmailValid(false)
        }
        if (password == "" || password == null) {
            return SetPasswordValid(false)
        }
        if (repeatPassword == "" || repeatPassword == null) {
            return SetRepeatPasswordValid(false)
        }
        try {
            authService.register(username.toLowerCase(), email.trim().toLowerCase(), password.trim())
                .then(authData => {
                    if (authData.ok) {
                        authService.login(username, password)
                            .then((loginResp) => {
                                login(loginResp);
                                navigate('/MainBanner');
                            })
                    }
                });
        } catch (ex) {
            console.log(ex)
        }

    }

    return (
        <>
            <div className='container-fluid'>
                <div className="titlepage">
                    <h2>Register Form</h2>
                </div>
            </div>

            <form onSubmit={registerSubmitHandler} method="POST">
                <input type="text" name="username" id='username'
                    className="input col-sm-4"
                    placeholder='username'
                    value={username}
                    onChange={handleUsername} />
                <br />
                {
                    usernameTaken
                    &&
                    <Alert type={"danger"} text={"Username is already taken."} />
                }
                <br />
                {
                    !usernameValid
                    &&
                    <Alert type={"danger"} text={"Username must be 4 characters or longer and can only contain letters."} />
                }
                <br />
                <input type="text" name="email" id='email'
                    className="input col-sm-4" placeholder="email"
                    value={email || ""}
                    onChange={handleEmail}
                />
                <br />
                {
                    emailTaken
                    &&
                    <Alert type={"danger"} text={"E-mail is already taken."} />
                }
                <br />
                {
                    !emailValid
                    &&
                    <Alert type={"danger"} text={"Please enter a valid e-mail."} />
                }
                <br />
                <input type="password" name="password" id="password"
                    className="input col-sm-4" placeholder='password'
                    value={password || ""}
                    onChange={handlePassword}
                />
                <br />
                {
                    !passwordValid
                    &&
                    <Alert type={"danger"} text={"Password must be atleast 8 characters long. Should contain 1 lowercase and 1 uppercase letters, 1 digit and 1 symbol character '!@$%&*'"} />
                }
                <br />
                <br />
                <input type="password" name="repeat-pass" id="repeat-pass"
                    className="input col-sm-4" placeholder='repeat password'
                    value={repeatPassword || ""}
                    onChange={handleRepeatPassword}
                />
                <br />
                {
                    !repeatPasswordValid
                    &&
                    <Alert type={"danger"} text={"The entered passwords doesn't match."} />
                }
                <br />
                <br />
                <button type="submit" className="col-sm-4 btn btn-primary ">Sign up</button>
            </form>

        </>
    );
}

export default Register;