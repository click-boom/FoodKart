import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../auth/authService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [formData, setFormData] = useState({ password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailVerified = localStorage.getItem("tokenVerified");
    if (emailVerified === "true") {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/resetPassword",
          { email: localStorage.getItem("email"), password: formData.password }
        );

        if (response) {
          clearLocalStorage();
          setTimeout(() => {
            navigate("/auth");
          }, 2000);
        }
      } catch (err) {
        toast.error("Invalid Credentials! Try Again");
      }
    } else {
      toast.error("Verify your credentials and try again");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${"/backgrounds/authPages/login.jpg"})`,
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        width: "full",
        height: "full",
      }}
    >
      <div className="bg-main bg-opacity-50 w-screen h-screen flex justify-center items-center font-montserrat">
        <div className="flex flex-col bg-slate-100 p-6 items-center justify-center rounded-xl shadow-sm shadow-yellow-400 w-full md:w-1/2 lg:w-[60%] xl:w-[37%]">
          <div className="h-20 w-50">
            <img src="/logoAssets/logobright.svg" alt="Logo" />
          </div>
          <span className="text-3xl  my-5 mt-10 font-semibold">
            Update your Password
          </span>
          <form
            className="flex flex-col w-full p-2 gap-6 mt-5 justify-center items-center"
            onSubmit={handleLogin}
          >
            <div className="w-full flex items-center gap-3 relative">
              <MdVpnKey size={40} color="#FFD700" />
              <input
                id="password"
                name="password"
                type={passwordVisibility ? "text" : "password"}
                placeholder="Enter new Password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 w-[95%] md:w-[85%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
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
                Set Password
                <Toaster
                  className="absolute right-0 transform translate-x-16 transition-transform duration-300 ease-in-out"
                  richColors
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
