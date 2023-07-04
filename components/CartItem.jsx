import React, { useContext, useState } from "react"
import { Context } from "../src/Context"
// PropTypes is an object with built in validators like string, shape, etc
import PropTypes from "prop-types"
import useHover from "../hooks/useHover"

function CartItem({ item }) {

    const { removeCart } = useContext(Context)

    // const [hovered, setHovered] = useState(false)

    /**
     * useHover() returns an object >> {hovered, hoverRef}
     */
    const { hovered, hoverRef } = useHover()

    // set the className based on the hovered state 
    const removeType = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line"

    return (
        <div className="cart-item">
            {/* the "()" of the arrow function does not signify the function to execute when CartItem component loads but it signifies that the function takes in no parameter, thus the arrow function will only run when the onClick event is triggered */}
            <i
                className={removeType}
                onClick={() => removeCart(item)}
                // onMouseEnter={() => setHovered(true)}
                // onMouseLeave={() => setHovered(false)}
                /**
                 * we're attaching the hoverRef object to the delete icon element
                 * So, now, hoverRef.current will return the delete icon
                 */
                ref={hoverRef}
            ></i>
            <img src={item.url} width="130px" />
            <p>$5.99</p>
        </div>
    )
}

// attach propTypes prop to CartItem component so that react can compare the props passed to the CartItems component against the props inside the object of propTypes 
CartItem.propTypes = {
    //.shape() defines the structure of the item object
    item: PropTypes.shape({
        //.isRequired ensures that the value of url is a strng, else an error will be logged onto the console
        url: PropTypes.string.isRequired
    })
}

export default CartItem