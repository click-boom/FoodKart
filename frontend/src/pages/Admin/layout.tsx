import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import NavBar from "../../Components/admin/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center">
      <NavBar />
      <div className="p-9 w-[95%] h-full">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
