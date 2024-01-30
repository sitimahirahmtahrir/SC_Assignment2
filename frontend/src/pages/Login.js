import { Form, Button, Alert, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import utmlogo from "../assets/utm-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import Footer from "../components/Footer";

const Login = ({ login, isAuthenticated, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [login_fail, setFail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
    setFail("");
  }, [email, password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await login(email, password);
    console.log(data);
    if (data.detail) {
      setErrMsg(data.detail);
      setFail(true);
      setIsLoading(false);
    } else {
      setFail(false);
      setTimeout(() => {
        setIsLoading(false);
          navigate("/equipment-list");
      }, 1000);
    }
  };

  return (
    <div className="main-content">
      <div className="utm-logo">
        <img src={utmlogo} alt="logo" />
      </div>
      <div className="header-center d-flex justify-content-evenly">
        <div>
          <h2>LASER CENTRE</h2>
          <h1>Equipments & Facilities</h1>
        </div>
        <div></div>
      </div>
      <div className="content">
        <div className="greetings">
          <h3>Welcome back!</h3>
          <p>
            Our services are now back and it only requires a few clicks to get
            the services!<br></br> We provide a <b>Laser equipment rental</b>{" "}
            and a <b>sample analysis service</b>.<br></br> Now, with the sample
            analysis service, you don't need to come to the centre to get your
            sample analysis.
          </p>
        </div>
        <div className="login-form">
          {login_fail ? (
            <Alert variant="danger">
              <p>{errMsg}</p>
            </Alert>
          ) : (
            <p></p>
          )}
          <p>Already a user? Sign In here</p>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="6"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Link
                to="/reset-password"
                style={{
                  color: "darkgreen",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
              <Button variant="dark" type="submit" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Login);
