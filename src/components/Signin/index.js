import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageForUser, setMessageForUser] = useState("");

  const token = sessionStorage.getItem("token");
  const handleLogin = async (e) => {
    // e.preventDefault();
    const body = {
      username,
      password,
    };
    try {
      const { data } = await axios.post(
        "https://test-twiglets.herokuapp.com/auth/login",
        body
      );
      // saving token in sessionStorage - when user logs out this token needs to be removed
      setMessageForUser(data);

      sessionStorage.setItem("token", data.access_token.token);
    } catch (err) {
      console.error("Oops, there's been an error: ", err);
    }
  };
  console.log(token);
  return (
    <div className="packet">
      <form className="sign-up overlay">
        <h2 className="caveat fm-header">Fellow TwigElite</h2>
        <br />
        <input
          className="caveat"
          type="text"
          placeholder="NAME"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        <input
          className="caveat"
          type="password"
          placeholder="PASSWORD 1"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <Link
          onClick={(e) =>
            !sessionStorage.getItem("token") ? e.preventDefault() : null
          }
          // to={token ? "/add-location" : null}
          to={token ? "/" : "/registry"}
        >
          <button
            className="draw caveat"
            type="submit"
            onClick={(e) => handleLogin(e)}
          ><span>Login</span></button>
        </Link>
      </form>
    </div>
  );
};

export default Signin;
