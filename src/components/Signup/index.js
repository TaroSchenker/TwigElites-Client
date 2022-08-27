import React, { useState } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [messageForUser, setMessageForUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const body = {
      username,
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "https://test-twiglets.herokuapp.com/auth/register",
        body
      );
      setMessageForUser(data);
      console.log(messageForUser);
    } catch (err) {
      console.error("Oops, there's been an error: ", err);
    }
  };

  return (
    <div className="packet">
      <form className="sign-up overlay">
        <h2 className="caveat fm-header">Become a TwigElite</h2>
        <input
          className="caveat"
          type="text"
          placeholder="EMAIL"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
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
          className="caveat"
          type="password"
          placeholder="PASSWORD 2"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
        />
        <br />
        <input
          className="special-btn caveat"
          type="submit"
          value="JOIN"
          onClick={(e) => handleRegister(e)}
        />
      </form>
    </div>
  );
};

export default Signup;
