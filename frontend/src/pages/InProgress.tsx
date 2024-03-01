import Layout from "../layout";

const ProgressPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-[2.33%] md:px-80">
        <img src="/logoAssets/browser.png" className="w-44 md:w-auto" />
        <span className="text-main font-montserrat font-bold md:text-5xl text-2xl py-8 text-center">
          This feature is currently under development and will be rolled out
          soon !
        </span>
      </div>
    </Layout>
  );
};

export default ProgressPage;
