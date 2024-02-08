const Cards = () => {
  return (
    <div className="flex flex-col">
      <div
        className="w-full h-80 p-3"
        style={{
          backgroundImage: `url(${"src/assets/backgrounds/about.png"})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          scale: "none",
          width: "full",
          height: "full",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${"src/assets/logoAssets/logobright.svg"})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            scale: "none",
            width: "full",
            height: "full",
          }}
          className="bg-yellow-300 w-12 h-12 mt-3"
        ></div>
      </div>
      <div className="bg-red-100 w-full h-[30%] p-2.5">
        <a href="">
          <span className="text-xl">name of hotel</span>
        </a>
      </div>
    </div>
  );
}

export default Cards