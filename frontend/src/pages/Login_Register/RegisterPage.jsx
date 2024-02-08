import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdVpnKey } from "react-icons/md";
import { BiSolidRename } from "react-icons/bi";
const RegisterPage = () => {
  const [PasswordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url(${"src/assets/backgrounds/authPages/register.jpg"})`,
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        width: "full",
        height: "full",
      }}
    >
      <div className="h-screen w-screen flex justify-center items-center bg-main bg-opacity-50  font-montserrat">
        <div className="flex flex-col bg-slate-100 items-center justify-center rounded-xl shadow-sm shadow-main w-full md:w-1/2 lg:w-[60%] xl:w-[37%]">
          <div className="h-20 w-50 ">
            <img src="src/assets/logoAssets/logobright.svg" />
          </div>
          <span className="text-4xl mt-10 font-bold text-main text-center">
            Welcome to FoodKart!
          </span>
          <span className="text-3xl my-5 font-semibold">
            Please register below!
          </span>
          <form className="flex flex-col w-full p-5 gap-5 items-center justify-center">
            <div className="flex">
              <BiSolidRename size={40} color="#FFD700" />
              <div className="flex flex-col gap-5 md:flex-row items-center md:gap-3 w-full px-3 ">
                <input
                  name="fname"
                  placeholder="First Name"
                  className="p-3 w-full md:w-[60%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
                />
                <input
                  name="lname"
                  placeholder="Last Name"
                  className="p-3 w-full md:w-[60%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-3 px-10">
              <FaUser size={30} color="#FFD700" />
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="p-3 w-full rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
              />
            </div>
            <div className="w-full flex items-center gap-3 px-10">
              <HiOutlineMail size={35} color="#FFD700" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className=" p-3 w-full rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
              />
            </div>
            <div className="w-full flex items-center gap-3 px-4 ml-9">
              <MdVpnKey size={40} color="#FFD700" />
              <input
                name="password"
                type={PasswordVisibility ? "text" : "password"}
                placeholder="Password"
                className="p-3 w-full md:w-[95%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
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
              <button className="px-5 py-3 bg-main rounded-full text-white font-bold text-2xl hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition">
                Sign Up
              </button>
              <a href="/auth" className="m-3 mt-5 text-lg">
                Already Registered?{" "}
                <span className="text-main text-xl font-semibold underline">
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
