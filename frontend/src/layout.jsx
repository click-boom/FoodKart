import PropTypes from "prop-types";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer/>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
