import React, { useState } from "react";
import { CgBowl } from "react-icons/cg";
import { GoHeart } from "react-icons/go";
import { FaBars } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdVpnKey } from "react-icons/md";

import { clearLocalStorage, isLoggedIn } from "../../auth/authService";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="flex items-center h-24 bg-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="flex mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 mb-5 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 h-full items-center">
        <a href="/">
          <img
            src="/logoAssets/logobright.svg"
            className="cursor-pointer"
            width={230}
            alt="Logo"
          />
        </a>
      </div>
      <div className="flex-grow"></div>
      <div className="hidden lg:flex items-center mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6">
        <a href="/wishlist">
          <GoHeart
            size={25}
            color="#FFD700"
            className="mx-2 sm:mx-3 md:mx-4 lg:mx-5 xl:mx-6"
          />
        </a>
        <a href="/carts">
          <CgBowl
            size={30}
            color="#FFD700"
            className="mx-2 sm:mx-3 md:mx-4 lg:mx-5 xl:mx-6"
          />
        </a>
        {isLoggedIn() ? (
          <div className="flex">
            <button
              onClick={(e) => {
                e.preventDefault();
                localStorage.setItem("tokenVerified", "true");
                navigate("/auth/reset");
              }}
              className=" px-5  h-14 bg-main text-white font-montserrat text-xl font-semibold  rounded mx-2 hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition"
            >
              <div className="flex items-start">
                <MdVpnKey size={24} />
                <span className="mx-3">Reset Password</span>
              </div>
            </button>
            <button
              onClick={() => {
                clearLocalStorage();
                location.reload();
              }}
              className=" px-5 h-14 bg-main text-white font-montserrat text-xl font-semibold  rounded mx-2 hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition"
            >
              <div className="flex items-center gap-2">
                <TbLogout size={34} />
                <span className="">Logout</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="flex">
            <button
              onClick={() => {
                navigate("/auth");
              }}
              className=" px-5 w-36 h-14 bg-main text-white font-montserrat text-xl font-semibold  rounded mx-2 hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition"
            >
              <div className="flex items-start">
                <TbLogin2 size={24} />
                <span className="mx-3">Login</span>
              </div>
            </button>
            <button
              onClick={() => {
                navigate("/auth/register");
              }}
              className=" px-5 h-14 bg-main text-white font-montserrat text-xl font-semibold  rounded mx-2 hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition"
            >
              <div className="flex items-center gap-2">
                <HiOutlineUserAdd size={34} />
                <span className="">Register</span>
              </div>
            </button>
          </div>
        )}
        {}
      </div>
      <div className="lg:hidden flex items-center justify-end mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6">
        <FaBars
          size={25}
          color="#FFD700"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer"
        />
      </div>
      {isOpen && (
        <div className="absolute top-24 right-0 w-52 bg-slate-100 z-[1] rounded">
          <div className="flex flex-col">
            <a href="/wishlist" className="flex items-center p-3 px-5">
              <GoHeart size={25} color="#FFD700" />
              <span className="ml-5">Favorites</span>
            </a>
            <hr className="border border-main opacity-35" />
            <a className="flex items-center p-3 px-5" href="/carts">
              <CgBowl size={30} color="#FFD700" />
              <span className="ml-5">Cart</span>
            </a>
            <hr className="border border-main opacity-35" />
            {isLoggedIn() ? (
              <div className="flex flex-col">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem("tokenVerified", "true");
                    navigate("/auth/reset");
                  }}
                  className="flex items-center p-3 px-5"
                >
                  <MdVpnKey size={25} color="#FFD700" />
                  <span className="ml-5">Reset password</span>
                </a>
                <hr className="border border-main opacity-35" />
                <a
                  className="flex items-center p-3 px-5"
                  onClick={(e) => {
                    e.preventDefault();
                    clearLocalStorage();
                    location.reload();
                  }}
                >
                  <TbLogout size={30} color="#FFD700" />
                  <span className="ml-5">Log Out</span>
                </a>
              </div>
            ) : (
              <div className="flex flex-col">
                <a href="/auth" className="flex items-center p-3 px-5">
                  <TbLogin2 size={25} color="#FFD700" />
                  <span className="ml-5">Login</span>
                </a>
                <hr className="border border-main opacity-35" />
                <a className="flex items-center p-3 px-5" href="auth/register">
                  <HiOutlineUserAdd size={30} color="#FFD700" />
                  <span className="ml-5">Register</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
