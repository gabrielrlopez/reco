import React from "react";
import Slider from "./myBase/Slider";

import Container from "react-bootstrap/esm/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Server } from "react-bootstrap-icons";

const UserProfile = ({
  searchedUserPhoto,
  searchedUserName,
  searchedUserFullName,
  favoriteBookArr,
  readLaterBookArr,
}) => {
  return (
    <Container>
      <Jumbotron>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="user-profile-photo"
            src={`/users/${searchedUserPhoto}`}
            style={{
              marginRight: "30px",
            }}
          />
          <h1>{searchedUserName}</h1>
        </div>
        {readLaterBookArr.length === 0 && favoriteBookArr.length === 0 ? (
          <>
            <div
              style={{
                textAlign: "center",
                marginTop: "100px",
                height: "30vh",
              }}
            >
              <Server size={60} />
              <h1>This user's base is empty</h1>
            </div>
          </>
        ) : (
          <>
            <h5>{`${searchedUserFullName[0]}`}'s Favorite Books</h5>
            <Slider itemArr={favoriteBookArr} />

            <h5>{`${searchedUserFullName[0]}`}'s Books Marked to Read Later</h5>
            <Slider itemArr={readLaterBookArr} />
          </>
        )}
      </Jumbotron>
    </Container>
  );
};

export default UserProfile;
