import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-100">
      <img src="./static/media/mascot.png" className="mascot"/>
      <Link className="logout caveat" to="/registry" onClick={() => sessionStorage.removeItem("token")}>
        Logout
      </Link>
    </header>
  );
};

export default Header;
