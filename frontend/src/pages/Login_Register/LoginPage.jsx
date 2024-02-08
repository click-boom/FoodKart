import {useState} from 'react'
import { HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdVpnKey } from "react-icons/md";

const LoginPage = () => {
 const [PasswordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url(${"src/assets/backgrounds/authPages/login.jpg"})`,
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        width: "full",
        height: "full",
      }}
    >
      <div className="bg-main bg-opacity-50 w-screen h-screen flex justify-center items-center font-montserrat ">
        <div className="flex flex-col bg-slate-100 p-6 items-center justify-center rounded-xl shadow-sm shadow-yellow-400 w-full md:w-1/2 lg:w-[60%] xl:w-[37%]">
          <div className="h-20 w-50">
            <img src="src/assets/logoAssets/logobright.svg" />
          </div>
          <span className="text-4xl mt-10 font-bold text-main">
            Welcome Back!
          </span>
          <span className="text-3xl my-5 font-semibold ">
            Please Sign in to continue
          </span>
          <form className=" flex flex-col w-full p-2 space-y-6 mt-5 justify-center items-center">
            <div className="w-full flex items-center gap-3">
              <HiOutlineMail size={40} color="#FFD700" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className=" p-3 w-[95%] md:w-[85%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
              />
            </div>
            <div className="w-full flex items-center gap-3">
              <MdVpnKey size={40} color="#FFD700" />
              <input
                name="password"
                type={PasswordVisibility ? "text" : "password"}
                placeholder="Password"
                className="p-3 w-[95%] md:w-[85%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
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
                Log in
              </button>
              <span className="m-3 mt-5 text-lg">
                Not registered yet?
                <a
                  href="/register"
                  className="text-main text-xl font-semibold underline cursor-pointer"
                >
                  Register Now!
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
