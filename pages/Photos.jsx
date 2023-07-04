import React, { useContext } from "react"
import { Context } from "../src/Context"
import Image from "../components/Image"
import { getClass } from "../utils"

function Photos() {
    // Context is an object that has Provider & Consumer as its prop
    // useContext(Context) returns an object >> {photosState:photosState}
    // we deconstruct it as >> {photosState} = useContext(Context)
    const { photosState } = useContext(Context)
    console.log(photosState)

    // photosState is an array of objects. Each object has details about a photo
    // we render an <Image /> component & pass the props-value(key={photo.id}, img={photo}, lassName={getClass(photoIndex)})at every iteration of .map()
    // getClass() is a function in 'index.js' under the utils folder that takes in the index and does some calculation to decide which image should be big & small
    const imageElements = photosState.map((photo, photoIndex) => (
        <Image
            key={photo.id}
            img={photo}
            className={getClass(photoIndex)}
        />
    ))
    return (
        <main className="photos">
            {imageElements}
        </main>
    )
}

export default Photos