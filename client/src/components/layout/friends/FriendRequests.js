import { React, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { reRender } from "../../../actions/profile";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../../../actions/friendRequests";

import Container from "react-bootstrap/esm/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Spinner from "../Spinner";
import NoFriendRequests from "../notfound/NoFriendRequests";

const FriendRequests = ({
  acceptFriendRequest,
  declineFriendRequest,
  reRender,
  profile: { profile, loading, rendered },
}) => {
  useEffect(() => {}, [rendered]);

  if (!profile || loading) return <Spinner />;

  const currentUserFriendRequests = profile.data.friendRequests;

  const acceptRequest = (e) => {
    acceptFriendRequest(e.target.value);
    reRender(true);
  };
  const declineRequest = (e) => {
    declineFriendRequest(e.target.value);
    reRender(true);
  };

  return (
    <>
      {currentUserFriendRequests.requests.length === 0 ? (
        <NoFriendRequests />
      ) : (
        <Container>
          {currentUserFriendRequests.requests.length > 0 ? (
            <Container>
              <h1>Friend Requests</h1>
              {currentUserFriendRequests.requests.map((request) => (
                <Jumbotron
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginRight: "23px" }}>
                      <img
                        className="request-profile-photo"
                        src={`/users/${request.photo}`}
                      />
                    </div>
                    <div>
                      <h1>{request.userName}</h1>
                      <h5>{`${request.userFullName[0]} ${request.userFullName[1]}`}</h5>
                    </div>
                  </div>
                  <div>
                    <p>
                      <Button
                        value={request.userId}
                        onClick={acceptRequest}
                        variant="success"
                        style={{ marginRight: "5px" }}
                      >
                        Accept
                      </Button>
                      <Button
                        value={request.userId}
                        onClick={declineRequest}
                        variant="danger"
                      >
                        Decline
                      </Button>
                    </p>
                  </div>
                </Jumbotron>
              ))}
            </Container>
          ) : null}
        </Container>
      )}
    </>
  );
};

FriendRequests.PropType = {
  acceptFriendRequest: PropTypes.func.isRequired,
  declineFriendRequest: PropTypes.func.isRequired,
  reRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  acceptFriendRequest,
  declineFriendRequest,
  reRender,
})(FriendRequests);
