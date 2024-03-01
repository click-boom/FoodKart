import axios from "axios";
import React, { useEffect, useState } from "react";

interface CardProps {
  dishInfo: {
    id: number;
    category_ID: number;
    dishImage: string;
    dish: string;
  };
}

const Cards: React.FC<CardProps> = ({ dishInfo }) => {
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState<
    { id: number; category: string }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/category/getAllCategories"
        );
        if (!response.ok) {

          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.category : "Unknown Category";
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const userIdString = localStorage.getItem("userId");
    let userId;
    if (userIdString !== null) {
      userId = parseInt(userIdString);
    }
    const payload = {
      user_id: userId,
      dish_id: dishInfo.id,
      quantity: quantity,
    };

    axios
      .post("http://localhost:8080/cart/saveToCart", payload, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
        } else {
          throw new Error("Failed to add item to cart");
        }
      });
  };

  return (
    <div className="flex flex-col">
      <div
        className="w-full h-80 p-3"
        style={{
          backgroundImage: `url(${`data:image/jpeg;base64,${dishInfo.dishImage}`})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex flex-col bg-yellow-100 w-full h-auto p-2 flex-grow overflow-hidden">
        <span className="text-md text-start break-words">
          {getCategoryName(dishInfo.category_ID)}
        </span>
        <div className="flex justify-between items-center ">
          <span className="text-2xl text-start  break-words">
            {dishInfo.dish}
          </span>

          <div className="flex">
            <button
              className="px-3 bg-main text-black text-4xl rounded hover:bg-yellow-400"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 text-center mx-2 rounded focus:outline-none"
            />
            <button
              className="px-3 bg-main text-black text-3xl rounded hover:bg-yellow-400"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex self-center justify-center m-1 mt-4 py-2 w-32 bg-main text-white rounded hover:bg-yellow-400"
        >
          <span className="text-center font-montserrat font-bold">
            Add to Cart
          </span>
        </button>
      </div>
    </div>
  );
};

export default Cards;
