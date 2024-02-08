import { useState } from "react";
import { CgBowl } from "react-icons/cg";
import { GoHeart } from "react-icons/go";
import { FaRegUser, FaBars } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="flex items-center  h-24 bg-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="flex mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 mb-5 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 h-full items-center">
        <a href="/">
          <img
            src="src/assets/logoAssets/logobright.svg"
            className="cursor-pointer"
            width={230}
          />
        </a>
      </div>
      <div className="flex-grow"></div>
      <div className="hidden lg:flex items-center mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6">
        <GoHeart
          size={25}
          color="#FFD700"
          className="mx-2 sm:mx-3 md:mx-4 lg:mx-5 xl:mx-6"
        />
        <CgBowl
          size={30}
          color="#FFD700"
          className="mx-2 sm:mx-3 md:mx-4 lg:mx-5 xl:mx-6"
        />
        <FaRegUser
          size={25}
          color="#FFD700"
          className="mx-2 sm:mx-3 md:mx-4 lg:mx-5 xl:mx-6"
        />
      </div>
      <div className="lg:hidden flex items-center justify-end mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6">
        <FaBars size={25} color="#FFD700" onClick={() => setIsOpen(!isOpen)} />
      </div>
      {isOpen && (
        <div className="absolute top-24 right-0 w-52 bg-slate-100 z-[1] rounded">
          <div className="flex flex-col">
            {" "}
            <div className="flex items-center p-3 px-5">
              <GoHeart size={25} color="#FFD700" />
              <span className="ml-5">Favorites</span>
            </div>
            <hr className="border border-main opacity-35" />
            <div className="flex items-center p-3 px-5">
              <CgBowl size={30} color="#FFD700" />
              <span className="ml-5 ">Cart</span>
            </div>
            <hr className="border border-main opacity-35" />
            <div className="flex items-center p-3 px-5">
              <FaRegUser size={25} color="#FFD700" />
              <span className="ml-5">User</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
