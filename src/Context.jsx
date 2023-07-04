import React, { Component, useState, useEffect } from "react"
//React.createContext() returns a context object with the props, Provider and Consumer
// "const {Provider} = React.createContext()" needs to be outside of the component because its a global variable
// "Context" is capitalized even though its an object but not a component. This is because, its a convention to capitalize React objects that hold components. In this case, the "Context" object is a React object(not a normal JS object) that holds the Provider & Consumer components
const Context = React.createContext()

// props is an object
// props object belongs to ContextProvider
// in this case, props.children returns "<Router><App /></Router>" 
// value prop belongs to Context.Provider component. The value prop can be accessed by props.children(App component & Route component)
function ContextProvider(props) {
    // initialize photosState as empty array
    const [photosState, setPhotosState] = useState([])

    const url =
        "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"

    /**
     * useEffect runs only on the first load because dependency is none(epmty array)
     * initially, photosState is an empty array
     * 
     */
    useEffect(() => {
        fetch(url) // returns a promise
            /**
             * response.json() parses the response from string to array
             * response is an object
             * .json() reads the response's body and parses it from string to array
             */
            .then(response => response.json())
            // updates photosState to the new array, of objects which is "data"
            .then(data => setPhotosState(data))
            .catch(error => console.log('Error fetching data:', error)) // log error 
    }, [])

    // id is the id of the photo that user clicked. This is is passed from the Image component
    const toggleFavorite = (id) => {
        // whenever we have a function that alters a value of a prop in an array, we need to return a new array from a map metod that carries out the altering tasks
        // This is to make sure the original state is not directly alterred
        const newphotosArray = photosState.map(photo => {
            if (photo.id === id) {
                console.log("executed")
                console.log(id)
                console.log(!photo.isFavorite)
                return { ...photo, isFavorite: !photo.isFavorite }
            } else {
                return photo
            }
        })

        // update the photosState to the returned array of newphotosArray 
        setPhotosState(newphotosArray)
    }


    // Initialize cartItems
    const [cartItems, setCartItems] = useState([])

    // adds a new img/photo to cartItems state
    const addCart = (img) => {
        setCartItems(prevCartItems => {
            return [...prevCartItems, img]
        })
    }
    console.log("cartItems >>", cartItems)

    // removes an img/photo from cartItems state
    const removeCart = (img) => {
        setCartItems(prevCartItems => {
            return prevCartItems.filter((prevCartItem) => {
                // return a an array with img/photos where their id does not match the img.id(the img that was clicked)
                return prevCartItem.id !== img.id
            })
        })
    }

    // remove all items from "cartItems" state 
    const emptyCart = () => {
        return setCartItems([])
    }

    return (
        <Context.Provider value={
            {
                photosState: photosState,
                toggleFavorite: toggleFavorite,
                cartItems: cartItems,
                addCart: addCart,
                removeCart: removeCart,
                emptyCart: emptyCart
            }}>
            {props.children}
        </Context.Provider>
    )

}

export { ContextProvider, Context }