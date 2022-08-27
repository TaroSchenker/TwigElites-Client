import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageForUser, setMessageForUser] = useState("");
  const [setToken, token, userId, setUserId] = useContext(UserContext);

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
      setToken(data.access_token);
      setUserId(data.user_details.id);
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
          onClick={(e) => (!token ? e.preventDefault() : null)}
          to="/add-location"
        >
          <input
            className="special-btn caveat"
            type="submit"
            value="LOGIN"
            onClick={(e) => handleLogin(e)}
          />
        </Link>
      </form>
    </div>
  );
};

export default Signin;
