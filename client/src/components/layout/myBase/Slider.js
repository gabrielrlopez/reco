import React from "react";
import Carousel from "react-multi-carousel";

import Card from "react-bootstrap/esm/Card";

const Slider = ({ itemArr }) => {
  //Carousel responsive functionality
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive} infinite={true}>
      {itemArr.map((book) => (
        <Card
          key={book.googleId}
          border="0"
          style={{ backgroundColor: "transparent" }}
        >
          <Card.Body>
            <img width="180" src={book.cover} />
          </Card.Body>
        </Card>
      ))}
    </Carousel>
  );
};

export default Slider;
