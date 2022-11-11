import React from 'react';
export default function ShopNowItemImage(){
    return(
        <div className ="carousel-inner">
            <div className ="carousel-item active">
                <div className ="container-fluid">
                    <div className ="carousel-caption">
                        <div className ="text-bg">
                            <h1>Weapons</h1>
                                <figure><img className="banner_main_img" src="https://cdn-icons-png.flaticon.com/512/8041/8041345.png" alt="#" /></figure>
                        </div>
                    </div>
                </div>
            </div>
            <div className ="carousel-item">
                <div className ="container-fluid">
                    <div className ="carousel-caption">
                        <div className ="text-bg">
                            <h1>Armor</h1>
                                <figure><img className="banner_main_img" src="https://cdn-icons-png.flaticon.com/512/3828/3828555.png" alt="#" /></figure>
                        </div>
                    </div>
                </div>
            </div> <div className ="carousel-item">
                <div className ="container-fluid">
                    <div className ="carousel-caption">
                        <div className ="text-bg">
                            <h1>Miscellaneous</h1>
                                <figure><img className="banner_main_img" src="https://cdn-icons-png.flaticon.com/512/909/909438.png" alt="#" /></figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}