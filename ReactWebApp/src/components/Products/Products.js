import React, { useEffect, useState } from "react";
import ProductsItems from './ProductsItems';
import * as productServices from '../../services/ProductServices';
import * as categoryServices from '../../services/CategoryService';
import { useAuthContext } from "../../contexts/AuthContext";
import './Products.css'

export const GetAllProducts = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        productServices.getAll()
            .then(res => {
                setItems(res);
            });

    }, []);

    return (items)
}

export const GetAllCategories = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        categoryServices.getAll()
            .then(res => {
                setItems(res);
            });
    }, []);

    return (items)
}

export default function Products() {
    const { user } = useAuthContext();
    const [currentCategoryId, setCurrentCategoryId] = useState(getInitialState);

    let [withFilter, setWithFilter] = useState(false);

    let developerPanel =
        <>
            {
                (user.userRoles == "Admin" || user.userRoles == "Employee")
                &&
                <>
                    <div className="titlepage">
                        <h2>Developer's Panel</h2>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <ProductsItems edit="true" />
                    </div>
                </>
            }
        </>

    const [allCategoriesIdToFilter, SetAllCategoriesIdToFilter] = useState([]);
    // const GetAllFilteredProductsGetting = () => {

    useEffect(() => {
        if (withFilter == false) return;
        SetAllCategoriesIdToFilter([currentCategoryId])

        categoryServices.getById(currentCategoryId).then(x => {
            if (x[3] == null) {
                categoryServices.getAll().then(resCategories => {
                    resCategories.forEach(elementCategories => {
                        if (elementCategories.parentId == currentCategoryId) {
                            productServices.getAll()
                                .then(firstResult => firstResult)
                                .then(resProducts => resProducts.forEach(element => {
                                    if (element.categoryId == elementCategories.id) {
                                        SetAllCategoriesIdToFilter(allCategoriesIdToFilter => [...allCategoriesIdToFilter, element.id]);
                                    }
                                }))
                        }
                    });
                })
            }
        })
    }, [currentCategoryId])


    const getInitialState = () => {
        const name = ["Select a Category"];
        return name;
    };

    const handleChange = (e) => {
        setCurrentCategoryId(e.target.value);
        setWithFilter(true);
    };

    const handleNoFilter = () => {
        setWithFilter(false);
    }

    return (
        <>
            <div className="products">
                {developerPanel}
                <div className="titlepage">
                    <h2>
                        Products
                    </h2>
                </div>
                <div className="justify-content-center">
                    <button className="btn btn-primary col-sm-4" onClick={handleNoFilter} >Clear filter</button>
                    <br />
                    <select className="btn" value={currentCategoryId} onChange={handleChange}>
                        <option value="default">Select a Category</option>
                        {
                            GetAllCategories().map(item =>
                                <option type="button" key={item.id} value={item.id}>
                                    {item.name}
                                </option>)
                        }
                    </select>

                </div>
                <>
                    {
                        !withFilter
                        &&
                        <div className="container-fluid row d-flex justify-content-center">{
                            GetAllProducts().map(item =>
                                <ProductsItems
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    description={item.description}
                                    edit="false"
                                />
                            )}
                        </div>
                    }
                    {
                        withFilter
                        &&
                        <div className="container-fluid row d-flex justify-content-center">{
                            GetAllProducts().map(item =>
                                [...allCategoriesIdToFilter].map(el =>
                                    (el == item.id || item.categoryId == currentCategoryId)
                                    &&
                                    <ProductsItems
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        price={item.price}
                                        imageUrl={item.imageUrl}
                                        description={item.description}
                                        edit="false"
                                    />
                                )
                            )}
                        </div>
                    }
                </>
            </div>
        </>
    )
}