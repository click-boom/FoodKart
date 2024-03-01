const TestPage = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${"/backgrounds/clientPage/clientpage.jpg"})`,
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-[50vh] bg-slate-800 opacity-40"></div>
      </div>
      <div
        className="size-60 bg-blue-500 mx-5 my-3"
        style={{
          backgroundImage: `url(${"/backgrounds/clientPage/clientpage.jpg"})`,
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </>
  );
};

export default TestPage;
