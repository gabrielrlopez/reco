import { React, useState } from "react";
import { updateUserInfo } from "../../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import "../styles/Account.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Pen } from "react-bootstrap-icons";

const UpdateProfile = ({ auth: { user }, updateUserInfo }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const [profilePhoto, setProfilePhoto] = useState({ photo: "" });

  const { email, firstName, lastName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onChangePhoto = (e) => setProfilePhoto(e.target.files[0]);

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (email !== "") formData.append("email", email);
    if (firstName !== "") formData.append("firstName", firstName);
    if (lastName !== "") formData.append("lastName", lastName);
    if (profilePhoto.photo !== "") formData.append("photo", profilePhoto);

    if (
      formData.has("firstName") === true ||
      formData.has("lastName") === true ||
      formData.has("email") === true ||
      formData.has("photo") === true
    )
      updateUserInfo(formData);

    setFormData({
      email: "",
      firstName: "",
      lastName: "",
    });
  };

  return (
    <>
      <div
        className="form-container"
        style={{ margin: "0 auto", marginTop: "20px" }}
      >
        <h1>
          Update Your Profile <Pen />
        </h1>
        <Form onSubmit={onSubmit}>
          {!user ? (
            <Spinner />
          ) : (
            <>
              <Form.Group>
                <Form.Label>New Email</Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder={user.email}
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>New First Name</Form.Label>
                <Form.Control
                  id="firstName"
                  type="text"
                  placeholder={user.firstName}
                  value={firstName}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>New Last Name</Form.Label>
                <Form.Control
                  id="lastName"
                  type="text"
                  placeholder={user.lastName}
                  value={lastName}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Choose New Profile Photo</Form.Label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img className="profile-photo" src={`/users/${user.photo}`} />
                  <Form.File
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    placeholder="Upload"
                    onChange={(e) => onChangePhoto(e)}
                  />
                </div>
              </Form.Group>
              <Button variant="outline-info" type="submit">
                Submit
              </Button>
            </>
          )}
        </Form>
      </div>
    </>
  );
};

UpdateProfile.propType = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  updatePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { updateUserInfo })(UpdateProfile);
