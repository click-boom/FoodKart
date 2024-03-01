import React, { useEffect, useState } from "react";
import Cards from "./Cards";

interface CardsContainerProps {
  keyPrefix: string;
  isSearchEnabled: boolean;
  search?: string;
}

const CardsContainer: React.FC<CardsContainerProps> = ({
  keyPrefix,
  isSearchEnabled,
  search,
}) => {
  const [hotels, setHotels] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/dish/findAllDishes")
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    isSearchEnabled && search
      ? hotel.dish.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <section className="flex py-2 md:py-5 lg:py-10 justify-center font-montserrat">
      <div className="container">
        <div className="grid grid-cols-1 px-5 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredHotels.map((hotel, index) => (
            <Cards key={`${keyPrefix}-${index}`} dishInfo={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsContainer;