import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="h-[40%] bg-off font-noto">
      <div className="text-slate-200 p-5 px-16 mt-10 gap-16 grid sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col p-5">
          <span className="font-semibold text-xl uppercase text-main">
            we&apos;re foodkart:
          </span>
          <a href="" className="my-1">
            About Us
          </a>
          <a href="" className="my-1">
            Available areas
          </a>
          <a href="" className="my-1">
            Delivery Charges
          </a>
        </div>
        <div className="flex flex-col p-5">
          <span className="font-semibold text-xl uppercase text-main">
            get help:
          </span>
          <a href="" className="my-1">
            How to Order?
          </a>
          <a href="" className="my-1">
            FAQs
          </a>
        </div>
        <div className="flex flex-col p-5">
          <span className="font-semibold text-xl uppercase text-main">
            contact us:
          </span>
          <span className="my-1">Email: thefoodkart01@gmail.com</span>
          <span className="font-semibold text-xl uppercase mt-5 text-main">
            Call Us:
          </span>
          <span className="my-1 text-justify">
            <span className="font-semibold mr-2.5 text-slate-500">
              KATHMANDU:
            </span>{" "}
            01-245123,&nbsp;&nbsp;01-245124,
            <br />
            01-245125,&nbsp;&nbsp;01-245126
          </span>
          <span className="my-3 text-justify">
            <span className="font-semibold mr-2.5 text-slate-500">
              POKHARA:
            </span>{" "}
            01-245127,&nbsp;&nbsp;01-245128,
            <br />
            01-245129,&nbsp;&nbsp;01-245120
          </span>
        </div>
        <div className="flex flex-col p-5">
          {" "}
          <span className="font-semibold text-xl uppercase text-main">
            connect with us:
          </span>
          <div className=" flex gap-3 w-4/5 p-2 my-3">
            <a className="hover:text-main" href="">
              <FaFacebook size={35} />
            </a>
            <a className="hover:text-main" href="">
              <FaInstagram size={35} />
            </a>
            <a className="hover:text-main" href="">
              <FaXTwitter size={35} />
            </a>
            <a className="hover:text-main" href="">
              <FaYoutube size={35} />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end py-4 px-20 ">
        <hr className="border-main" />
        <span className="text-slate-400 text-end my-2">
          © 2020 Foodmandu Pvt. Ltd. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
