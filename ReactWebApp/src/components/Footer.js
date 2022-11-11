import React from 'react';

export default function Footer() {
    return (
        // <div className='container-fluid '>
            <footer className='footer footer-container'>
                <ul className="location_icon">
                    <li><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2928/2928883.png" style={{ width: 48 }} alt="" /></a><br /> Varna, Bulgaria</li>
                    <li><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/719/719703.png" style={{ width: 48 }} alt="" /></a><br /> +359 877667339</li>
                    <li><a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2875/2875394.png" style={{ width: 48 }} alt="" /></a><br /> Wrathofsalim@gmail.com</li>
                </ul>
                <div className="copyright">
                    <p><img src="https://cdn-icons-png.flaticon.com/512/3146/3146169.png" style={{ width: 48 }} alt="" /> 2022 All Rights Reserved. Design by<a href="https://html.design/"> Free Html Templates</a></p>
                    {/* <div className="d-flex justify-content-around"> */}
                    {/* <div className="col-md-12"> */}
                    {/* </div> */}
                    {/* </div> */}
                </div>
            </footer>
        // </div>
    )
}