import { React, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPassword } from "../../actions/auth";

import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ResetPassword({ resetPassword }) {
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    resetPassword(email);
  };

  // //Redirect if logged in
  // if (isAuthenticated) {
  //   return <Redirect to="/home" />;
  // }

  return (
    <Container style={{ marginTop: "20px" }}>
      <div className="form-container" style={{ margin: "0 auto" }}>
        <h1>Reset Your Password</h1>

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

          <Button variant="outline-info" type="submit">
            Send Link
          </Button>
        </Form>
      </div>
    </Container>
  );
}

ResetPassword.propType = {
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(ResetPassword);
