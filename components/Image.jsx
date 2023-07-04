import React, { useState, useContext } from "react"
// PropTypes is an object with built in validators like string, shape, etc
// its pascal case because its a class like object/ module
import PropTypes from 'prop-types';
import { Context } from "../src/Context"
import useHover from "../hooks/useHover"

// the props passed from "Photos.js" are deconstructed to {className, img, id}
// "img" is the object with props id, isFavorite & url
function Image({ className, img, id }) {
    /**
     * Context is an object with Provider & Consumer component as values for their respective props
     * useContext(Context) returns a the value object which was passed to Context.Provider component
     * This value object has 2 props >>> {photosState:photosState, toggleFavorite:toggleFavorite}
     */
    const { toggleFavorite, addCart, cartItems, removeCart } = useContext(Context)
    // initialize hovered to false
    // const [hovered, setHovered] = useState(false)

    // useHover() returns an object >> {hovered, hoverRef}
    const { hovered, hoverRef } = useHover()

    //code execution: user clicks on heart icon > toggleFavorite(id) exectuted > toggleFavorite(id) in ContextProvider component gets executed >> photosState gets updated > all child components that consume the context value, photosState, will be re-rendered. In this case Photo component re-renders causing the Image component to re-render
    const heartIconRender = () => {
        // returns a filled heart if img.isFavorite is true
        if (img.isFavorite) {
            return <i className="ri-heart-fill favorite" onClick={(event) => {
                // stop the event from propagating to the parent div thus triggering the onMouseLeave event which sets the hovered state to false before the toggleFavorite(id) function gets executed
                event.stopPropagation()
                toggleFavorite(img.id)
            }}></i>
        } else if (hovered) {
            return <i className="ri-heart-line favorite" onClick={(event) => {
                // stop the event from propagating to the parent div thus triggering the onMouseLeave event which sets the hovered state to false before the toggleFavorite(id) function gets executed
                event.stopPropagation()
                toggleFavorite(img.id)
            }}></i>
        }
    }

    //
    const cartIconRender = () => {
        /**
         * "cartItems.some(cartItem => cartItem.id === img.id)" returns true when one cartItem is equal to the img.id
         */
        if (cartItems.some(cartItem => cartItem.id === img.id)) {
            return <i className="ri-shopping-cart-fill cart" onClick={() => {
                event.stopPropagation()
                removeCart(img)
            }}></i>
        } else if (hovered) {
            return <i className="ri-add-circle-line cart" onClick={() => {
                event.stopPropagation()
                addCart(img)
            }}></i>
        }
    }


    return (
        <div
            className={`${className} image-container`}
            // when mouse hovers on div, set 'hovered' to true 
            // onMouseEnter={() => setHovered(true)}
            // when mouse hovers on div, set 'hovered' to false  
            // onMouseLeave={() => setHovered(false)}
            ref={hoverRef}
        >
            <img src={img.url} className="image-grid" />
            {heartIconRender()}
            {cartIconRender()}
        </div>
    )
}

/**
 * need to write like this: "Image.propTypes" so that we can assign the propTypes property to the Image component
 * the propTypes property tells react to check the props passed to the Image component against the specified types in the object of the propTypes property 
 * PropType is an object that contains built in validators like string, shape, etc
 * */
Image.propTypes = {
    // did not add ".isRequired", thus, even if a non-valid value is passed, then on the screen, the value will not appear nor a warning will be displayed on the console during development mode
    className: PropTypes.string,
    /**
     * PropTypes.shape() defines the expected structure of the img object
     */
    img: PropTypes.shape({
        //".isRequired" is to ensure that that specific prop is required to have a valid value else a warning will be displayed on the console during development mode
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool.isRequired,
    })
}
export default Image