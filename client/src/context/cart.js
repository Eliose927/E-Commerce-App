import { useState, useEffect, useContext, createContext } from "react"

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setcart] = useState([])
    useEffect(() => {
        let exixtingCartItem = localStorage.getItem('cart')
        if (exixtingCartItem) setcart(JSON.parse(exixtingCartItem))
    }, [])
    //default axios

    return (
        <CartContext.Provider value={[cart, setcart]}>
            {children}
        </CartContext.Provider>
    );
};

//custom hook
const useCart = () => useContext(CartContext)

export { useCart, CartProvider }