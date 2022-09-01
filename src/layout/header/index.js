import React, { useContext, useEffect } from "react";
import { MapDataContext } from "../../MapDataContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [
  tokenContext, setTokenContext
  ] = useContext(MapDataContext);
  const token = localStorage.getItem("twiglets-token");

  const handleLogout = () => {
    console.log("handle the log out")

    localStorage.removeItem("twiglets-id");
    localStorage.removeItem("twiglets-token");
    localStorage.clear()
  

    setTokenContext(token)
  };


      <div>
        <img src="./static/media/logo.png" className="mascot"/>
        {/* <h1 className="text-white caveat name">TwigElites</h1> */}
        <Link className="logout draw short" to="/registry" onClick={() => sessionStorage.removeItem("token")}>
          <span className="medium short">Logout</span>
        </Link>
      </div>

  useEffect(() => {
    const token = localStorage.getItem("twiglets-token");

   
  }, [tokenContext]);
  return (
    <header className="w-100">
      <div>
      <img src="./static/media/logo.png" className="mascot" />
        <Link
          className="logout draw short"
          to={token == null ? "/login" : "/login"}
          // to= {token !== 'undefined' ?  "/Logout": "/Login"}
          onClick={handleLogout}
        >
          <span className="short">
            {token == null ? "Login" : "Logout"}
            {/* {token !== 'undefined' ?  "Logout": "Login"} */}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
