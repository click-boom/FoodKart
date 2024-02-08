import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdVpnKey } from "react-icons/md";
import { BiSolidRename } from "react-icons/bi";
const RegisterPage = () => {
  const [PasswordVisibility, setPasswordVisibility] = useState(false);
  return (
    // bg-gradient-to-r from-yellow-200 to-yellow-400
    <div
      style={{
        backgroundImage: `url(${"src/assets/backgrounds/food.png"})`,
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        opacity: 50,
        width: "full",
        height: "full",
      }}
    >
      <div className="bg-yellow-200 w-screen h-screen flex justify-center items-center font-montserrat bg-opacity-20">
        <div className="flex flex-col bg-slate-100 items-center justify-center rounded-xl shadow-sm shadow-yellow-400 w-full md:w-1/2 lg:w-[60%] xl:w-[37%]">
          <div className="h-20 w-50 bg-slate-500">
            <img src="src/assets/Logosets/logobright.svg" />
          </div>
          <span className="text-4xl mt-10 font-bold text-yellow-300 text-center">
            Welcome to FoodKart!
          </span>
          <span className="text-3xl my-5 font-semibold">
            Please register below!
          </span>
          <form className="flex flex-col w-full p-5 gap-5 items-center justify-center">
            <div className="flex flex-col gap-5 md:flex-row items-center md:gap-3 w-full px-10 ">
              <BiSolidRename size={40} color="#FFD700" />
              <input
                name="fname"
                placeholder="First Name"
                className="p-3 w-full md:w-[60%] rounded-2xl border-transparent border-2 focus:border-yellow-400 focus:outline-none"
              />
              <input
                name="lname"
                placeholder="Last Name"
                className="p-3 w-full md:w-[60%] rounded-2xl border-transparent border-2 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div className="w-full flex items-center gap-3 px-10">
              <FaUser size={30} color="#FFD700" />
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="p-3 w-full rounded-2xl border-transparent border-2 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div className="w-full flex items-center gap-3 px-10">
              <HiOutlineMail size={35} color="#FFD700" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className=" p-3 w-full rounded-2xl border-transparent border-2 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div className="w-full flex items-center gap-3 px-4 ml-9">
              <MdVpnKey size={40} color="#FFD700" />
              <input
                name="password"
                type={PasswordVisibility ? "text" : "password"}
                placeholder="Password"
                className="p-3 w-full md:w-[95%] rounded-2xl border-transparent border-2 focus:border-yellow-400 focus:outline-none"
              />
              <div
                onClick={() => setPasswordVisibility(!PasswordVisibility)}
                className="cursor-pointer"
              >
                {PasswordVisibility ? (
                  <HiOutlineEyeOff size={30} color="#FFD700" />
                ) : (
                  <HiOutlineEye size={30} color="#FFD700" />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button className="px-5 py-3 bg-yellow-300 rounded-full text-white font-bold text-2xl hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition">
                Log in
              </button>
              <a href="/auth" className="m-3 mt-5 text-lg">
                Already Registered?{" "}
                <span className="text-yellow-400 text-xl font-semibold underline">
                  Proceed to Login
                </span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
