import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("twiglets-token");

  const handleLogout = () => {
    localStorage.removeItem("twiglets-id");
    localStorage.removeItem("twiglets-token");
  };


      <div>
        <img src="./static/media/logo.png" className="mascot"/>
        {/* <h1 className="text-white caveat name">TwigElites</h1> */}
        <Link className="logout draw caveat" to="/registry" onClick={() => sessionStorage.removeItem("token")}>
          <span className="medium">Logout</span>
        </Link>
      </div>

  return (
    <header className="w-100">
      <div>
      <img src="./static/media/logo.png" className="mascot" />
        <Link
          className="logout draw caveat"
          to={token == undefined ? "/login" : "/login"}
          onClick={handleLogout}
        >
          <span>
            {token == undefined ? "Login" : "Logout"}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
