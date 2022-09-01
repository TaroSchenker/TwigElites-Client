import React, { useState } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [password, setPassword] = useState("");
  const [messageForUser, setMessageForUser] = useState("");
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
        "http://test-twiglets.herokuapp.com/auth/register/",
        body
      );
      console.log("DATA", data);
      setIsRegistered(true);
      setMessageForUser(data);
      data !== "Username already exists!" && navigate("/login");
    } catch (err) {
      console.error("Oops, there's been an error: ", err);
    }
  };

  console.log(isRegistered);

  return (
    <div className="packet">
      <form className="sign-up overlay">
        <h2 className="caveat fm-header">Join the TwigElites</h2>
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
        <p>{messageForUser}</p>

        <button
          className="draw caveat"
          type="submit"
          value="JOIN"
          onClick={(e) => handleRegister(e)}

        >
          <span className="medium">Join</span>
        </button>

      </form>
    </div>
  );
};

export default Signup;
