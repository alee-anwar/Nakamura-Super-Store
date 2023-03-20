// import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";

function Register() {
  return (
    <div className="container">
      <div className="top">
        <h1>Create an Account</h1>
      </div>
      <div className="middle">
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
            style={{
              width: "350px",
              height: "40px",
            }}
            type="password"
            placeholder="Repeat your password"
          />
          <br />
        </form>
      </div>
      <div className="bottom">
        <Link to="/login">
          <Button
            style={{
              width: "350px",
              // height: "40px",
            }}
            id="registerButton"
            variant="primary"
          >
            Register
          </Button>
        </Link>

        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Register;
