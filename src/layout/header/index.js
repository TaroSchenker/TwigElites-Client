import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-100">
      <div>
        <img src="./static/media/mascot.png" className="mascot"/>
        <Link className="logout special-btn caveat" to="/registry" onClick={() => sessionStorage.removeItem("token")}>
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;
