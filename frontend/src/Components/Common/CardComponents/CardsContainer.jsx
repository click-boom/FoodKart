import Cards from "./Cards";
import { FaArrowRightLong } from "react-icons/fa6";

const CardsContainer = () => (
  <section className="flex py-16 md:py-20 lg:py-28 justify-center font-montserrat">
    <div className="container">
      <div className="flex p-3 m-5 justify-between">
        <span className="text-3xl font-semibold text-yellow-400">
          Featured Restaurants
        </span>
        <a href="">
          <div className="flex items-center">
            <span className="text-end text-xl underline text-yellow-500">
              View all
            </span>
            <FaArrowRightLong color="#FFD700" size={25} className="ml-2" />
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 px-5 gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  </section>
);

export default CardsContainer;
