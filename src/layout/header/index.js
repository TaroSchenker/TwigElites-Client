import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("twiglets-id");
    localStorage.removeItem("twiglets-token");
  };
  return (
    <header className="w-100">

      <div>
        <img src="./static/media/mascot.png" className="mascot"/>
        <Link className="logout draw caveat" to="/registry" onClick={() => sessionStorage.removeItem("token")}>
          <span>Logout</span>
        </Link>
      </div>

    </header>
  );
};

export default Header;
