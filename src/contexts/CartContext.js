import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage"

export const CartContext = createContext([]);

export const useCartContext = () => {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    const [cartItems, SetCartItems] = useLocalStorage('cart', {});
    const [tempCartItems, SetTempCartItems] = useState({});

    const getCartQuantity = () => {
        return Object.values(cartItems).length;
    }

    const getAllItems = () => {
        return Object.values(cartItems);
    }

    const getItemQuantity = (id) => {
        let qty = 0;
        let itemsInCart = Object.values(cartItems);
        if (itemsInCart.find(x => x.id == id)) {
            itemsInCart.map(item => {
                qty = item.quantity;
            })
        }

        itemsInCart.map(x => {
            if (x.id == id) {
                qty = x.quantity
            }
        })

        return (qty)
    }

    const addItemToCart = (id, name, price) => {
        let itemsInCart = Object.values(cartItems)

        if (itemsInCart.find(x => x.id == id) == null) {
            console.log(id, name, price)
            return SetCartItems(
                {
                    ...cartItems,
                    [id]: { id, name, price, quantity: 1 }
                }
            )
        } else {
            return itemsInCart.map(item => {
                if (item.id == id) {
                    console.log(id, name, price, item.quantity)
                    return SetCartItems(
                        {
                            ...cartItems,
                            [id]: { id, name, price, quantity: item.quantity + 1 }
                        }
                    )
                }
            })
        }
    }

    const removeItemFromCart = (id, name, price) => {
        let itemsInCart = Object.values(cartItems)

        try {
            if (itemsInCart.find(x => x.id == id).quantity == 1) {
                let temp = itemsInCart.filter(item => item.id !== id)

                var res = Object.keys(temp).reduce((prev, curr, index) => {
                    return {
                        ...prev,
                        [temp[index].id]: temp[curr]
                    }
                }, {});
                return SetCartItems(res);
            } else {
                itemsInCart.map(item => {
                    if (item.id == id) {
                        console.log("Here I am", item.id, item.name, item.price, item.quantity)
                        return SetCartItems(
                            {
                                ...cartItems,
                                [id]: { id, name, price, quantity: item.quantity - 1 }
                            }
                        )
                    }
                })
            }
        } catch (ex) {
            console.log(ex);
            alert("You are trying something impossible")
        }
    }


    const clear = () => {
        SetCartItems({});
    }

    return (
        <CartContext.Provider value={{ getCartQuantity, getItemQuantity, addItemToCart, removeItemFromCart, clear, getAllItems }} >
            {children}
        </CartContext.Provider >
    );
}