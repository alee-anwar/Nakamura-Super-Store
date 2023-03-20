import React from "react";
import { Button } from "react-bootstrap";
import "../loginCSS.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./Register";

const Login = () => {
  return (
    <div className="container">
      <div className="top">
        <h1 id="loginHeading">Login</h1>
      </div>
      <div className="middle mt-4">
        <form>
          <input
            style={{
              width: "350px",
              height: "40px",
            }}
            type="tel"
            placeholder="Phone number"
          />
          <br />
          <input
            style={{
              width: "350px",
              height: "40px",
            }}
            type="password"
            placeholder="password"
          />
          <br />
          <input
            style={{ textAlign: "left" }}
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            value="rememberMe"
          />
          Remember me
          <Link
            style={{
              marginLeft: "90px",
            }}
            to={<Register />}
          >
            Forgot password?
          </Link>
        </form>
      </div>
      <div className="bottom mt-4">
        <Link to="/homepage">
          <Button
            style={{
              width: "350px",
              // height: "40px",
            }}
            id="registerButton"
            variant="primary"
          >
            Login
          </Button>
        </Link>

        <Routes>
          <Route exact path="/homepage" element={<Homepage />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Login;
