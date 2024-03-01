import React, { useEffect, useState } from 'react';
import {Toaster} from 'sonner'
interface CartItem {
  cart_id: number;
  dish: string;
  dishImage: string;
  category_ID: number;
  price: number;
  quantity: number;
}
interface CartCardProps {
  item: CartItem;
  handleRemove: (id: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, handleRemove }) => {
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

  
  
  return (
    <div className="cart_card flex justify-between bg-slate-200 md:h-40 rounded-md p-2 gap-3 font-montserrat">
      <div className="flex gap-2">
        <div
          style={{
            backgroundImage: `url(${`data:image/jpeg;base64,${item.dishImage}`})`,
            backgroundPosition: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="size-24 md:size-36 bg-main"
        ></div>
        <div className="flex flex-col md:gap-1">
          <span className="text-main font-semibold text-2xl md:text-5xl">
            {item.dish}
          </span>
          <div className="flex items-center">
            <label className="md:text-2xl text-sm">Category:</label>
            <span className="text-slate-400 font-semibold text-md md:text-2xl">
              {getCategoryName(item.category_ID)}
            </span>
          </div>
          <span className="text-main font-semibold md:text-3xl text-xl">
            Rs.{item.price}
            <span className="span text-slate-400 font-semibold md:text-lg text-sm">
              /item
            </span>
          </span>
        </div>
      </div>
      <div className="size-24 md:size-36 flex flex-col items-center justify-end">
        <div className="flex items-center gap-1">
          <label className="md:text-xl">Quantity:</label>
          <span className="md:text-3xl text-main font-semibold text-lg">
            {item.quantity}
          </span>
        </div>
        <button
          onClick={() => handleRemove(item.cart_id)}
          className="m-1 md:px-3 p-1 bg-main text-black md:text-xl rounded hover:bg-yellow-400"
        >
          Remove
          <Toaster
            className="absolute right-0 transform translate-x-16 transition-transform duration-300 ease-in-out"
            richColors
          />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
