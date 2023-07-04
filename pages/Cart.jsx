import React, { useContext, useState, useEffect } from "react"
import { Context } from "../src/Context"
import CartItem from "../components/CartItem"

function Cart() {
    // deconstruct cartItems prop from Context object
    const { cartItems, emptyCart } = useContext(Context)

    //
    const cartItemElements = cartItems.map(item => (
        <CartItem key={item.id} item={item} />
    ))

    const [orderStatus, setOrderStatus] = useState("Place Order")
    const handleOrder = () => {
        // update 'orderStatus' state to "Ordering". this will cause the Cart component to re-render
        // the "setTimeout()" function will not be affected by the re-render because its a native javascript function that is independant of the react component lifecycle. Thus, when "handleOrder" function is executed, "setTimeout()" will wait for 3 mins and then execute the code inside it
        setOrderStatus("Ordering")
        setTimeout(() => {
            console.log("Order placed!")
            setOrderStatus("Place order")
            emptyCart()
        }, 3000)
    }

    // useEffect( () => {
    //     if(cartItems.length > 0) {
    //         setOrderStatus("Place order")
    //     } else {
    //         setOrderStatus("Place order")
    //     }
    // } ,[cartItems])

    // render the order button only if there are items in the cartItems
    const orderButton = cartItems.length > 0 && <div className="order-button">
        <button onClick={handleOrder}>{orderStatus}</button>
    </div>

    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: {
                (cartItems.length * 5.99).
                    toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })
            }</p>

            {orderButton}
        </main>
    )
}

export default Cart

