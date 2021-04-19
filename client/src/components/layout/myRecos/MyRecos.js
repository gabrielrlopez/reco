import React from "react";
import { connect } from "react-redux";
import BookRating from "../myRecos/BookRating";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import dateformat from "dateformat";
import { deleteReco, markRecoAsSeen } from "../../../actions/reco";

import "../styles/MyRecos.css";
import "../styles/BookRating.css";
import NoRecos from "../notfound/NoRecos";

import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import Card from "react-bootstrap/esm/Card";

const MyRecos = ({
  deleteReco,
  markRecoAsSeen,
  profile: { profile, loading },
}) => {
  if (!profile) return <Spinner />;

  const recos = profile.data.recos.books;

  //Delete reco
  const deleteRecos = (e) => {
    e.preventDefault();
    const recoId = e.target.value;
    deleteReco(recoId);
  };

  //Mark reco as seen
  const seenReco = (e) => {
    e.preventDefault();
    const recoId = e.target.value;
    markRecoAsSeen(recoId);
  };

  return (
    <>
      {recos.length === 0 ? (
        <NoRecos />
      ) : (
        <Container>
          <h1>Books</h1>

          <>
            {loading && profile === null ? (
              <Spinner />
            ) : (
              recos.map((book) => (
                <Jumbotron>
                  <div className="name-date">
                    <img
                      className="profile-photo"
                      src={`/users/${book.photo}`}
                    />
                    <h1>{`${book.userFullName[0]} ${book.userFullName[1]}`}</h1>
                    <h1>{dateformat(book.date, "mm/dd/yyyy, ddd h:MM TT")}</h1>
                  </div>

                  <br></br>

                  <h3>Title</h3>
                  <p>{book.reco.title}</p>

                  <h3>Description</h3>

                  <p>{book.reco.description}</p>

                  <div className="book-section">
                    <div className="details">
                      <h6>Author(s)</h6>
                      {book.reco.authors.map((author) => (
                        <p>{author}</p>
                      ))}

                      <h6>Genre(s)</h6>
                      {book.reco.genre.length === 0 ? (
                        <p>'Unavailable</p>
                      ) : (
                        book.reco.genre.map((genre) => <p>{genre}</p>)
                      )}

                      <h6>Page Count</h6>
                      <p>
                        {!book.reco.pageCount
                          ? "Unavailable"
                          : book.reco.pageCount}
                      </p>

                      <h6>Published Date</h6>
                      <p>{book.reco.publishedDate}</p>

                      <h6>Publisher</h6>
                      <p>{book.reco.publisher}</p>

                      <h6>Maturity Rating</h6>
                      <p>{book.reco.maturityRating}</p>
                    </div>

                    <Card
                      key={book.googleId}
                      border="0"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <Card.Body>
                        <img width="180" src={book.reco.cover} />
                      </Card.Body>
                    </Card>

                    <div>
                      <h3>Average Rating</h3>
                      <h5>(Rated by readers on Google)</h5>

                      <br></br>

                      <BookRating rating={book.reco.averageRating} />

                      <h3 style={{ marginTop: "60px" }}>
                        <a href={book.reco.previewLink}>Book Preview</a>
                      </h3>

                      <br></br>

                      <HandThumbsUp className="thumbsUp" size={25} />
                      <HandThumbsDown
                        className="thumbsDown"
                        size={25}
                        style={{ margin: "10px" }}
                      />
                      <Button
                        className={book.seen === true ? "hidden" : null}
                        style={{ marginRight: "5px" }}
                        value={book._id}
                        onClick={seenReco}
                      >
                        Mark As Seen
                      </Button>
                      <Button
                        variant="danger"
                        value={book._id}
                        onClick={deleteRecos}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Jumbotron>
              ))
            )}
          </>
        </Container>
      )}
    </>
  );
};

MyRecos.propType = {
  deleteReco: PropTypes.func.isRequired,
  markRecoAsSeen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { deleteReco, markRecoAsSeen })(
  MyRecos
);
