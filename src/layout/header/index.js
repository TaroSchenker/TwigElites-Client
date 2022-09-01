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
    console.log(localStorage.getItem("twiglets-token"))
    localStorage.removeItem("twiglets-id");
    localStorage.removeItem("twiglets-token");
    localStorage.clear()
  
    console.log(localStorage.getItem("twiglets-token"))
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
    console.log('in the suse effect', token);
    if(token){
      console.log('sing me a song', token, 'context', tokenContext)
    }
  }, [tokenContext]);
  return (
    <header className="w-100">
      <div>
      <img src="./static/media/logo.png" className="mascot" />
        <Link
          className="logout draw short"
          to={tokenContext == null ? "/login" : "/login"}
          // to= {token !== 'undefined' ?  "/Logout": "/Login"}
          onClick={handleLogout}
        >
          <span className="short">
            {tokenContext == null ? "Login" : "Logout"}
            {/* {token !== 'undefined' ?  "Logout": "Login"} */}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
