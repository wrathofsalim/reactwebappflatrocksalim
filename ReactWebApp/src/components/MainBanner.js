import React from 'react';
import ShopNowItemImages from "./ShopNowItemImages"
import { Link } from 'react-router-dom';

export default function MainBanner() {


    return (
        <>
            <section className="container-fluid">
                <div className="titlepage">
                    <h2>Main</h2>
                </div>
                <div id="banner1" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#banner1" data-slide-to="0" className="active"></li>
                        <li data-target="#banner1" data-slide-to="1"></li>
                        <li data-target="#banner1" data-slide-to="2"></li>
                    </ol>

                    <ShopNowItemImages />

                    <a className="carousel-control-prev" href="#banner1" role="button" data-slide="prev">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </a>
                    <a className="carousel-control-next" href="#banner1" role="button" data-slide="next">
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>
                <Link className="read_more" to="/Products">
                    <h1>
                        Shop
                    </h1>
                </Link>
            </section>
        </>
    )
}