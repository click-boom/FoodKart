import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { MdVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ token: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/auth/resetPassword/${formData.token}`
      );

      if (response.data) {
        localStorage.setItem("tokenVerified", "true");
        navigate("/auth/reset");
      } else {
        toast.error("Invalid token! Please try again.");
      }
    } catch (err) {
      toast.error(
        "An error occurred while processing your request. Please try again later."
      );
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
          <span className="text-4xl mt-10 font-bold text-main">
            Password Recovery
          </span>
          <span className="text-xl my-5 font-semibold break-words px-16">
            Before recovery, we must verify if it is you.Enter the verification
            token sent to your token in the field below
          </span>
          <form
            className="flex flex-col w-full p-2 gap-6 mt-5 justify-center items-center"
            onSubmit={handleVerification}
          >
            <div className="w-full flex items-center gap-3">
              <MdVpnKey size={40} color="#FFD700" />
              <input
                type="text"
                name="token"
                id="token"
                placeholder="token"
                value={formData.token}
                onChange={handleChange}
                className="p-3 w-[95%] md:w-[85%] rounded-2xl border-transparent border-2 focus:border-main focus:outline-none"
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <button className="px-5 py-3 bg-main rounded-full text-white font-bold text-2xl hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-400 transition">
                Verify Token
                <Toaster
                  className="absolute right-0 transform translate-x-16 transition-transform duration-300 ease-in-out"
                  richColors
                />
              </button>
              <span className="m-3 mt-5 text-lg">
                Remember Password?
                <a
                  href="/auth"
                  className="text-main text-xl font-semibold underline cursor-pointer"
                >
                  Sign in!
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
