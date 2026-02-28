import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosInstance';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        if (!token) {
            setCartItems([]);
            return;
        }
        try {
            const response = await api.get('/carts');
            if (response.data.success && response.data.data.items) {
                setCartItems(response.data.data.items);
            }
        } catch (error) {
            console.error("Failed to fetch cart", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    const addToCart = async (productId, quantity = 1) => {
        try {
            await api.post('/carts/items', { productId, quantity });
            fetchCart();
        } catch (error) {
            console.error("Failed to add to cart", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await api.delete(`/carts/items/${productId}`);
            fetchCart();
        } catch (error) {
            console.error("Failed to remove from cart", error);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            await api.put(`/carts/items/${productId}`, { quantity });
            fetchCart();
        } catch (error) {
            console.error("Failed to update quantity", error);
        }
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, fetchCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
