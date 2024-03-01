interface BillContainerProps {
  totalPrice: number;
  totalItems: number;
}

const BillContainer: React.FC<BillContainerProps> = ({
  totalPrice,
  totalItems,
}) => {
  return (
    <div className="yellow-container flex flex-col items-center bg-main md:w-[32.9%] px-8 p-3 md:p-5 md:pb-32 rounded-md font-montserrat">
      <span className="text-xl md:text-3xl mt-5 text-white font-bold">
        Order Confrimation
      </span>
      <div className="flex flex-col items-start w-full h-32 m-5  px-3 md:px-7">
        <div className="flex gap-3 items-center ">
          <span className="text-xl">Total items:</span>
          <span className="text-3xl text-white font-bold">{totalItems}</span>
        </div>
        <div className="flex gap-3 items-center ">
          <span className="text-xl">Total Price:</span>
          <span className="text-3xl text-white font-bold">
            Rs.
            <span className="text-3xl text-white font-bold">{totalPrice}</span>
          </span>
        </div>
        <hr className="border-white border mt-2 w-full" />
        <div className="flex gap-3 items-center ">
          <span className="text-xl">Final price:</span>
          <span className="text-3xl text-white font-bold">
            Rs.
            <span className="text-3xl text-white font-bold">{totalPrice}</span>
          </span>
        </div>
        <button className="flex self-center mt-4 bg-slate-50 text-main font-bold p-2.5 rounded-lg">
          Place order
        </button>
        <div className="flex self-end bg-yellow-200 mt-5 rounded-md w-full break-words">
          <span>
            <span className=" text-xl font-bold underline">Note:</span> Final
            price is exclusive of delivery charge
          </span>
        </div>
      </div>
    </div>
  );
};

export default BillContainer;