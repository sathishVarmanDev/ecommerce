import React, { useContext } from "react"
import { Link, Switch, Route } from "react-router-dom"
import { Context } from "../src/Context"

function Header() {
    // deconstruct cartItems prop from Context object
    const { cartItems } = useContext(Context)

    // if cartItems.length > 0, then display a filled cart, else an empty cart
    const carType = () => {
        if (cartItems.length > 0) {
            return <i className="ri-shopping-cart-fill ri-fw ri-2x"></i>
        } else {
            return <i className="ri-shopping-cart-line ri-fw ri-2x"></i>
        }
    }

    return (
        <header>
            <Link to="/"><h2>Pic Some</h2></Link>
            <Link to="/cart">{carType()}</Link>
        </header>
    )
}

export default Header
