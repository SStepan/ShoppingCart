import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void,
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

export function ShoppingCardProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);

    function getItemQuantity(id: number) {
        return cartItems.find(t => t.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(t => t.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(t => {
                    if (t.id === id) {
                        return { ...t, quantity: t.quantity + 1 }
                    } else {
                        return t;
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(t => t.id === id)?.quantity === 1) {
                return currItems.filter(t => t.id !== id);
            } else {
                return currItems.map(t => {
                    if (t.id === id) {
                        return { ...t, quantity: t.quantity - 1 }
                    } else {
                        return t;
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(t => t.id !== id);
        })
    }

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity
        }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}