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
        <Link className="logout draw short" to="/registry" onClick={() => sessionStorage.removeItem("token")}>
          <span className="medium short">Logout</span>
        </Link>
      </div>

  useEffect(() => {}, [token]);
  return (
    <header className="w-100">
      <div>
      <img src="./static/media/logo.png" className="mascot" />
        <Link
          className="logout draw short"
          to={token == undefined ? "/login" : "/login"}
          onClick={handleLogout}
        >
          <span className="short">
            {token == undefined ? "Login" : "Logout"}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
