import React from 'react';

export default function Contacts(){
    return (
        <div id="contact" className ="contact">
         <div className ="container-fluid">
            <div className ="row">
               <div className ="col-md-6">
                  <form id="request" className ="main_form">
                     <div className ="row d-flex justify-content-center">
                        <div className ="col-md-12 ">
                           <h3>Contact Us</h3>
                        </div>
                        <div className ="col-md-12 ">
                           <input className ="contactus" placeholder="Name" type="type" name="Name"/> 
                        </div>
                        <div className ="col-md-12">
                           <input className ="contactus" placeholder="Phone Number" type="type" name="Phone Number"/> 
                        </div>
                        <div className ="col-md-12">
                           <input className ="contactus" placeholder="Email" type="type" name="Email"/>                          
                        </div>
                        <div className ="col-md-12">
                           <input className ="contactusmess" placeholder="Message" type="type" Message="Name"/>
                        </div>
                        <div className ="col-md-12">
                           <button className ="send_btn">Send</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <div className ="container-fluid">
            <div className ="map_section">
               <div id="map">
               </div>
            </div>
         </div>
      </div>
    )
}