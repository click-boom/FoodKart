import Layout from "../../layout";
import CardsContainer from "../../Components/Common/CardComponents/CardsContainer";
import { GoSearch } from "react-icons/go";
import React, { useContext } from "react";
import { SearchContext } from "../../Components/Common/Contexts";
const AllDishes: React.FC = () => {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <Layout>
      <div className="flex flex-col w-full items-center py-4">
        <span className="text-5xl mb-5 text-main font-bold font-montserrat">
          Browse Dishes
        </span>
        <div className="flex flex-col w-full">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-3 items-center sm:flex-row sm:gap-1 w-full sm:w-1/2">
              <input
                className="flex w-[80%] p-3 rounded bg-slate-200 text-xl border-transparent border-2 focus:border-main focus:outline-none font-montserrat mb-2"
                placeholder="Search Dishes...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="p-3 w-36 h-14 bg-main text-white font-montserrat text-xl font-semibold  rounded mx-2 hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition">
                <div className="flex items-start">
                  <GoSearch size={24} />
                  <span className="mx-3">Search</span>
                </div>
              </button>
            </div>
            <div className="w-full">
              <CardsContainer
                keyPrefix="dishesPage"
                isSearchEnabled={true}
                search={search}
              />
            </div>
          </div>
        </div>{" "}
      </div>
    </Layout>
  );
};

export default AllDishes;
