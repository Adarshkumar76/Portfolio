import React from "react";
import "./lang.css";
import Slider from "react-slick";

const Lang = () => {
  var settings = {
    dots: false,
    focusOnSelect: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    swipeToSlide: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <hr />
      <h1 className="langH1">Technologies</h1>
      <Slider {...settings}>
        <div>
          <img src="/html.png" alt="html" />
        </div>
        <div>
          <img src="/css.png" alt="css" />
        </div>
        <div>
          <img src="/js.png" alt="js" />
        </div>
        <div>
          <img src="/ts.png" alt="ts" />
        </div>
        <div>
          <img src="/react.png" alt="react" />
        </div>
        <div>
          <img src="/redux.png" alt="redux" />
        </div>
        <div>
          <img src="/c.png" alt="c" />
        </div>
        <div>
          <img src="/android.png" alt="android" />
        </div>
        <div>
          <img src="/canva.png" alt="canva" />
        </div>
        <div>
          <img src="/Docker.png" alt="docker" />
        </div>
        <div>
          <img src="/express.png" alt="express" />
        </div>
        <div>
          <img src="/git.png" alt="git" />
        </div>
        <div>
          <img src="/github.png" alt="github" />
        </div>
        <div>
          <img src="/java.png" alt="java" />
        </div>
        <div>
          <img src="/Linux.png" alt="linux" />
        </div>
        <div>
          <img src="/mongo.png" alt="mongo" />
        </div>
        <div>
          <img src="/node.png" alt="node" />
        </div>
        <div>
          <img src="/socket.png" alt="socket" />
        </div>
      </Slider>
    </>
  );
};

export default Lang;
