import { IoRestaurantSharp } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../auth/authService";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDishesPage = location.pathname === "/admin/dishes";
  const isRequestsPage = location.pathname === "/admin/requests";

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get(`http://127.0.0.1:8080/user/getById/${userId}`, {
        headers: {
          authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { first_name, last_name, user_name } = response.data;
        setUser({ first_name, last_name, user_name });
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, []);

  const initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;

  return (
    <nav
      className={`flex flex-col  w-[18%] h-screen bg-slate-100 rounded-3xl p-5 font-montserrat`}
    >
      <div className=" p-3 flex items-center mb-2">
        <div className="bg-main p-2 mr-3 rounded-full">
          <span className="text-white font-bold text-2xl">{initials}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-main">
            {user.first_name} {user.last_name}
          </span>
          <span className="text-slate-500 ">{user.user_name}</span>
        </div>
      </div>
      <hr className="border-main mb-3" />
      <div className="flex flex-col p-5  text-slate-500">
        <span className="font-semibold text-lg">Portals:</span>
        <ul className="my-5">
          <a href="/admin/dishes">
            <div className="flex gap-4 text-2xl items-center mb-5">
              <div
                className={`flex justify-center items-center rounded-full w-12 h-12 ${
                  isDishesPage ? "bg-main" : "bg-white"
                }`}
              >
                <IoRestaurantSharp color={isDishesPage ? "white" : "#FFD700"} />
              </div>
              <li className={`${isDishesPage ? "text-main" : ""}`}>Dishes</li>
            </div>
          </a>
          <a href="/admin/requests">
            <div className="flex gap-4 text-2xl items-center mb-5">
              <div
                className={`flex justify-center items-center rounded-full w-12 h-12 ${
                  isRequestsPage ? "bg-main" : "bg-white"
                }`}
              >
                <MdMarkEmailUnread
                  color={isRequestsPage ? "white" : "#FFD700"}
                />
              </div>
              <li className={`${isRequestsPage ? "text-main" : ""}`}>
                Requests
              </li>
            </div>
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              clearLocalStorage();
              navigate("/auth");
            }}
          >
            <div className="flex gap-4 text-2xl items-center">
              <div className="flex justify-center items-center rounded-full w-12 h-12 bg-white">
                <TbLogout color="#FFD700" />
              </div>
              <li>Logout</li>
            </div>
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
