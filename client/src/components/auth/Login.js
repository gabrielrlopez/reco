import { React, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Container style={{ marginTop: "20px" }}>
      <div className="form-container" style={{ margin: "0 auto" }}>
        <h1>Log in</h1>
        <h5>
          Not registered with us yet? <a href="/register">Sign up</a>
        </h5>
        <br></br>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <h6>
            Forgot your password?{" "}
            <a href="/resetPassword">Reset Your Password</a>
          </h6>

          <br></br>

          <Button variant="outline-info" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </Container>
  );
}

Login.propType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
