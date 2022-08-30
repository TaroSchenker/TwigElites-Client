import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <img src="./static/media/mascot.png" className="mascot"/>
      <Link to="/registry" onClick={() => sessionStorage.removeItem("token")}>
        Logout
      </Link>
    </header>
  );
};

export default Header;
