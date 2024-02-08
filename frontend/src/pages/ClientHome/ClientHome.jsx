import Layout from "../../layout";
import { GoSearch } from "react-icons/go";
import { useState } from "react";
import CardsContainer from "../../Components/Common/CardComponents/CardsContainer";

const ClientHome = () => {
  const [scale, setScale] = useState(1);

  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url(${"src/assets/backgrounds/clientPage/clientpage.jpg"})`,
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col justify-end h-[85vh] items-center opacity-90"
      >
        <div className="flex flex-col gap-3 items-center sm:flex-row sm:gap-1 w-full sm:w-1/2">
          <input
            className="flex w-[80%] p-3 rounded bg-slate-200 text-xl border-transparent border-2 focus:border-main focus:outline-none font-montserrat mb-2"
            placeholder="Search Restaurants...."
            onFocus={() => setScale(1.1)}
            onBlur={() => setScale(1)}
          />
          <button className="p-3 w-36 h-14 bg-main text-white font-montserrat text-xl font-semibold  rounded mx-2 hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition">
            <div className="flex items-start">
              <GoSearch size={24} />
              <span className="mx-3">Search</span>
            </div>
          </button>
        </div>
        <img
          className="transition-transform duration-500 mb-12 "
          src="src/assets/backgrounds/clientPage/clientPageComponent.png"
          width={750}
          style={{ transform: `scale(${scale})` }}
        />
      </div>
      <CardsContainer />

      <div
        style={{
          backgroundImage: `url(${"src/assets/backgrounds/about1.png"})`,
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "color-dodge",
        }}
        className="flex flex-col items-center w-full h-[50%] py-28 opacity-60 font-montserrat "
      >
        <span className="text-6xl font-bold text-white underline">
          About Us
        </span>
        <p className="py-10 px-4 md:px-64 text-white text-center text-xl">
          FoodKart is the fastest, easiest and most convenient way to enjoy the
          best food of your favourite restaurants at home, at the office or
          wherever you want to. <br />
          <br />
          We know that your time is valuable and sometimes every minute in the
          day counts. That&apos;s why we deliver! So you can spend more time
          doing the things you love.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center font-montserrat bg-slate-200 mt-16 h-80">
        <span className="text-4xl font-semibold text-slate-600 m-7">
          List your Restaurant at
          <span className="text-yellow-400 text-5xl">FoodKart</span>!<br />{" "}
          Reach 2,00,000 + new customers.
        </span>
        <button className="p-3 bg-main text-white text-xl font-semibold  rounded mx-2 hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition">
          Send Request
        </button>
      </div>
    </Layout>
  );
};

export default ClientHome;
