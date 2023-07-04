// we are using useHover hook because there is a duplicate hook(useState) for the hovered state across CartItem component and Image component
// import react not needed since no JSX is being rendered
import { useState, useEffect, useRef } from "react"

function useHover() {
    const [hovered, setHovered] = useState(false)

    /**
     * useRef() returns an object with prop, 'current'
     * the "current" prop is initially set to null
     */
    const hoverRef = useRef(null)

    const enter = () => {
        setHovered(true)
    }

    const leave = () => {
        setHovered(false)
    }

    useEffect(() => {
        const element = hoverRef.current;
        if (element) {
            element.addEventListener("mouseenter", enter)
            element.addEventListener("mouseleave", leave)

            return () => {
                if (element) {
                    element.removeEventListener("mouseenter", enter)
                    element.removeEventListener("mouseleave", leave)
                }
            }
        }
    }, [])


    return { hovered, hoverRef }
}

export default useHover