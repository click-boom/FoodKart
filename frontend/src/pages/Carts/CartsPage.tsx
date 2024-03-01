import { useEffect, useState } from "react";
import BillContainer from "../../Components/Carts/BillContainer";
import CardsContainer from "../../Components/Carts/CardsContainer";
import Layout from "../../layout";
import { isLoggedIn } from "../../auth/authService";
import PopUp from "../../Components/Common/Popup";
import { useNavigate } from "react-router-dom";
const CartsPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
    }
  }, []);

  return (
    <>
      <Layout>
        {isLoggedIn() ? (
          <div>
            <p className="text-3xl md:text-5xl text-main font-montserrat font-semibold text-center">
              Your Cart Items
            </p>
            <div className=" flex flex-col gap-5 md:flex-row m-5 md:m-10 md:mx-20 rounded-md bg-slate-100 p-4 md:p-10 ">
              <CardsContainer
                setTotalPrice={setTotalPrice}
                setTotalItems={setTotalItems}
              />
              <BillContainer totalPrice={totalPrice} totalItems={totalItems} />
            </div>
          </div>
        ) : (
          <PopUp
            buttonText="Proceed Login"
            closable={false}
            message="Using Cart requires login"
            onClick={() => {
              navigate("/auth");
            }}
          />
        )}
      </Layout>
    </>
  );
};
export default CartsPage;
