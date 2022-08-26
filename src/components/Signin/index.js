import React, { useState } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageForUser, setMessageForUser] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const options = {
      username: username,
      password: password,
    };
    try {
      const { data } = await axios.post(
        "https://test-twiglets.herokuapp.com/auth/login",
        options
      );
      // saving token in sessionStorage - when user logs out this token needs to be removed
      sessionStorage.setItem("token", data.access_token);
      setMessageForUser(data);
    } catch (err) {
      console.error("Oops, there's been an error: ", err);
    }
  };
  console.log(sessionStorage.getItem("token"));

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
        <input
          className="special-btn caveat"
          type="submit"
          value="LOGIN"
          onClick={(e) => handleLogin(e)}
        />
      </form>
    </div>
  );
};

export default Signin;
