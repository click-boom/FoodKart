import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Login } from "../../auth/authService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/user/signin",
        formData
      );

      if (response.status === 200) {
        const { token, userId, admin } = response.data;

        Login(token, userId, admin, formData.email);

        if (admin) {
          navigate("/admin/dishes");
          toast.success("Admin Authentication successful!");
        } else {
          toast.success("User Authentication successful!");
          navigate("/");
        }
      }
    } catch (err) {
      toast.error("Invalid Credentials! Try Again");
    }
  };

  async function handleReset(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();
    if (formData.email != "") {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/forgotPassword",
          { email: formData.email }
        );
        if (response) {
          localStorage.setItem("email",formData.email);
          navigate("/auth/verify");
        }
      } catch (err) {
        toast.error("Couldn't send email at the moment. Please try again.");
      }
    } else {
      toast.error("Please enter your email to continue.");
    }
  }

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
          <span className="text-4xl mt-10 font-bold text-main">
            Welcome Back!
          </span>
          <span className="text-3xl my-5 font-semibold">
            Please Sign in to continue
          </span>
          <form
            className="flex flex-col w-full p-2 gap-6 mt-5 justify-center items-center"
            onSubmit={handleLogin}
          >
            <div className="w-full flex items-center gap-3">
              <HiOutlineMail size={40} color="#FFD700" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 w-[95%] md:w-[85%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
              />
            </div>
            <div className="w-full flex items-center gap-3 relative">
              <MdVpnKey size={40} color="#FFD700" />
              <input
                id="password"
                name="password"
                type={passwordVisibility ? "text" : "password"}
                placeholder="Password"
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
                Log in
                <Toaster
                  className="absolute right-0 transform translate-x-16 transition-transform duration-300 ease-in-out"
                  richColors
                />
              </button>
              <span className="m-3 mt-5 text-lg">
                Forgot Password?
                <a
                  className="text-main text-xl font-semibold underline cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleReset(e);
                  }}
                >
                  Reset Password!
                </a>
              </span>
              <span className="text-lg">
                Not registered yet?
                <a
                  href="/auth/register"
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
