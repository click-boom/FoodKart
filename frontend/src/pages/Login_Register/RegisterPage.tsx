import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { FaUser } from "react-icons/fa";
import { HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdVpnKey } from "react-icons/md";
import { BiSolidRename } from "react-icons/bi";

interface FormData {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  contact:number;
}

const RegisterPage: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const apiCall = useMutation<void, Error, FormData>({
    mutationKey: ["POST_USER_REGISTER"],
    mutationFn: async (FormData) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/user/signup",
          FormData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error:any) {
        throw new Error(error.response?.data || error.message);
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await apiCall.mutateAsync(data);
      toast.success("Registration successful!");
      // Handle successful registration, e.g., redirect to login page
    } catch (error) {
      console.error("Error during registration", error);
      if (error instanceof Error) {
        toast.error(`Error during registration: ${error.message}`);
        console.error("Error details:", error); // Log the entire error object
      } else {
        toast.error("An unknown error occurred during registration.");
        console.error("Unknown error details:", error); // Log the entire error object
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${"/backgrounds/authPages/register.jpg"})`,
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        width: "full",
        height: "full",
      }}
    >
      <div className="h-screen w-screen flex justify-center items-center bg-main bg-opacity-50 font-montserrat">
        <div className="flex flex-col bg-slate-100 items-center justify-center rounded-xl shadow-sm shadow-main w-full md:w-1/2 lg:w-[60%] xl:w-[37%]">
          <div className="h-20 w-50 ">
            <img src="/logoAssets/logobright.svg" alt="Logo" />
          </div>
          <span className="text-4xl mt-10 font-bold text-main text-center">
            Welcome to FoodKart!
          </span>
          <span className="text-3xl my-5 font-semibold">
            Please register below!
          </span>
          <form
            className="flex flex-col w-full p-5 gap-5 items-center justify-center "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full px-10 gap-2 items-center">
              <BiSolidRename size={35} color="#FFD700" />
              <div className="flex flex-col gap-5 md:flex-row items-center md:gap-3 w-full">
                <input
                  placeholder="First Name"
                  className="p-3 w-full md:w-[60%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
                  {...register("first_name")}
                />
                <input
                  placeholder="Last Name"
                  className="p-3 w-full md:w-[60%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
                  {...register("last_name")}
                />
              </div>
            </div>

            <div className="w-full flex items-center gap-3 px-10">
              <FaUser size={30} color="#FFD700" />
              <input
                type="text"
                placeholder="Username"
                className="p-3 w-full rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
                {...register("user_name")}
              />
            </div>
            <div className="w-full flex items-center gap-3 px-10">
              <HiOutlineMail size={35} color="#FFD700" />
              <input
                type="email"
                placeholder="Email"
                className=" p-3 w-full rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
                {...register("email")}
              />
            </div>
            <div className="w-full flex items-center gap-3 px-10">
              <HiOutlineMail size={35} color="#FFD700" />
              <input
                type="number"
                placeholder="Contact number"
                className=" p-3 w-full rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
                {...register("contact")}
              />
            </div>
            <div className="w-full flex items-center gap-3 px-10 relative">
              <MdVpnKey size={35} color="#FFD700" />
              <input
                type={passwordVisibility ? "text" : "password"}
                placeholder="Password"
                className="p-3 w-full rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
                {...register("password")}
              />
              <div
                onClick={() => setPasswordVisibility(!passwordVisibility)}
                className="cursor-pointer absolute right-3 sm:right-6 lg:right-16 top-1/2 transform -translate-y-1/2"
              >
                {passwordVisibility ? (
                  <HiOutlineEyeOff size={30} color="#FFD700" />
                ) : (
                  <HiOutlineEye size={30} color="#FFD700" />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button className="px-5 py-3 bg-main rounded-full text-white font-bold text-2xl hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition">
                Sign Up
                <Toaster
                  className="absolute right-0 transform translate-x-16 transition-transform duration-300 ease-in-out"
                  richColors
                />
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
