import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import axios from "axios";
interface CartItem {
  cart_id: number;
  dish: string;
  dishImage: string;
  category_ID: number;
  price: number;
  quantity: number;
}

const CardsContainer: React.FC<{
  setTotalPrice: (price: number) => void;
  setTotalItems: (items: number) => void;
}> = ({ setTotalPrice, setTotalItems }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const fetchCartItems = async (user_id: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/cart/geCartByUserId/${user_id}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );
      const cartData = await response.json();
      const cartItemsPromises = cartData.map(async (item: any) => {
        const dishResponse = await fetch(
          `http://127.0.0.1:8080/dish/findDishById/${item.dish_id}`
        );
        const dishData = await dishResponse.json();

        return {
          cart_id: item.id,
          dish: dishData.dish,
          dishImage: dishData.dishImage,
          category_ID: dishData.category_ID,
          price: dishData.price,
          quantity: item.quantity,
        };
      });

      const cartItems = await Promise.all(cartItemsPromises);
      setCartItems(cartItems);
      const totalItems = new Set(cartItems.map((item) => item.dish)).size;
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setTotalItems(totalItems);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const user_id = Number(localStorage.getItem("userId"));
  useEffect(() => {
    fetchCartItems(user_id);
  }, []);

  const handleRemove = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8080/cart/deleteCartById/${id}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        fetchCartItems(user_id);
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };
  return (
    <div className="flex flex-col w-[65%] bg-slate-100 gap-3 rounded-lg">
      {cartItems.map((item) => (
        <CartCard key={item.cart_id} item={item} handleRemove={handleRemove} />
      ))}
    </div>
  );
};

export default CardsContainer;
