import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageForUser, setMessageForUser] = useState("");
  const [token, setToken] = useLocalStorage("token");
  const [id, setId] = useLocalStorage("id");
  const [userId, setUserId] = useLocalStorage("user_id");
  // const token = sessionStorage.getItem("token");
  // console.log("ID:", id);
  // console.log("TOKEN:", token);
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
      setMessageForUser(data.access_token);
      setToken(data.access_token.token);
      setId(data.access_token.username);
      setUserId(data.access_token.user_id);
    } catch (err) {
      console.error("Oops, there's been an error: ", err);
    }
  };
  // const [isShownLog, setIsShownLog] = useState(true);
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   // setIsShownLog((current) => !current);
  // };
  return (
    // <Container>
    //   <Row>
    //     <Col s={12} className=" bg-warning">
    //       nav bar here
    //     </Col>
    //   </Row>
    //   <Row className="bg-warning mt-4" style={{ height: "80vh" }}>
    //     <Col className="bg-primary d-flex justify-content-center align-items-center">
    //       {isShownLog ? <Signin /> : <Signup />}
    //       <button onClick={(e) => handleClick(e)}></button>
    //     </Col>
    //   </Row>
    // </Container>
    <Container fluid>
      <Row className="bg-warning" style={{ height: "80vh" }}>
        <Col className="bg-dark-blue d-flex justify-content-center align-items-center flex-column main">
          {/* {isShownLog ? <Signin /> : <Signup />} */}
          <div className="packet">
       <form className="sign-up overlay">
         <h2 className="caveat fm-header">Fellow TwigElites</h2>
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
          onClick={(e) => (token === "undefined" ? e.preventDefault() : null)}
          to={token ? "/" : "/login"}
        >
          <button
            className="draw caveat"
            type="submit"
            onClick={(e) => handleLogin(e)}
          >
            <span className="medium">Login</span>
          </button>
        </Link>
      </form>
    </div>
      <p className="caveat text-white">
        Don't have an account? Signup{" "}
        <a className="txt-blue" href="/register"
        // onClick={(e) => handleClick(e)}
        >
          here
        </a>
      </p>
          {/* <button className="p-3" onClick={e => handleClick(e)}></button> */}
          {/* {children} */}
        </Col>
      </Row>
    </Container>
  );
};
export default Signin;
