import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useCartContext } from '../contexts/CartContext';

const NavbarHide = () => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            if (window.innerWidth > 1200) {
                document.getElementById("navbar").style.top = "-200px";
            } else {
                if (document.getElementById("navbar").offsetHeight > 500) {
                    document.getElementById("navbar").style.top = "-1000px";
                } else {
                    document.getElementById("navbar").style.top = "-200px";
                }
            }
        }
        prevScrollpos = currentScrollPos;
    }
}

export default function Header() {
    const { user } = useAuthContext();
    const { getCartQuantity } = useCartContext();
    let guestNavigation = (
        <>
            <Link className="col nav-link" to="/Login">
                Log In
            </Link>
            <Link className="col nav-link" to="/Register">
                Register
            </Link>
        </>
    )

    let customerNavigation =
        <>
            <Link className="col nav-link dropdown" to="/MainBanner">
                Main
            </Link>
            <Link className="col nav-link" to="/Products">
                Products
            </Link>
            {
                (user.userRoles == "Admin" || user == "Employee")
                &&
                <Link className="col nav-link" to="/Categories">
                    Categories
                </Link>
            }
            {
                (user.userRoles == "Admin" || user == "Employee")
                &&
                <Link className="col nav-link" to="/Users">
                    Users
                </Link>
            }
            <Link className="col nav-link" to="/Orders">
                Orders
            </Link>
            <Link className="col nav-link" to="/Addresses">
                Addresses
            </Link>
            {/* <Link className="col nav-link" to="/Task">
                Tasks
            </Link> */}

            <Link className="col nav-link" to="/Cart">
                Cart
                <div className='quantityTag'>{getCartQuantity()}</div>
            </Link>
            <Link className='col nav-link' to="/Logout">
                Log Out
            </Link>
        </>



    NavbarHide();

    return (
        <div className='container-fluid'>
            <div className="logo">
                <a href="MainBanner"><img src="images/logo.png" /></a>
            </div>
            <div className="container-fluid" >
                <nav id='navbar' className="autohide navbar navbar-expand-xl navbar-light d-flex justify-content-center ">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                        <img style={{ width: 50 }}
                            src="https://cdn-icons-png.flaticon.com/512/4638/4638134.png"
                            alt="" />
                    </button>
                    <div className="collapse navbar-collapse " id="navbarsExample04">
                        <ul className="navbar-nav ">
                            {user.userModel.userName
                                ? customerNavigation
                                : guestNavigation
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

