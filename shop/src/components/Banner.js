import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MyButton from "./reuseableComponents/MyButton";
import { useTranslation } from "react-i18next";


import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import img1 from "../assets/Banner/store.jpg";
import img2 from "../assets/Banner/grocery shop.jpg";
import img3 from "../assets/Banner/Good Quality.jpg";
import img4 from "../assets/Banner/multiple.jpg";
import img5 from "../assets/Banner/bike.jpg";

const images = [
  {
    url: img2,
    alt: "paper-bag-and-different-food-isolated",
    heading: "Grocery shopping has never been this fun!",
  },
  {
    url: img3,
    alt: "man caring grocery bag",
    heading: "Looking for Good Quality Ingridient?",
  },

  {
    url: img1,
    alt: "paper-bag-with-green-vegetables",
    heading: "If you can’t find it from others, we have it for you.",
  },

  {
    url: img4,
    alt: "retail-grocery-shopping-and-delivery",
    heading: "We make grocery shopping more interesting.",
  },

  {
    url: img5,
    alt: "holding-grocery-shopping-bag-full",
    heading: "Serving fresh ingredients your way everyday!",
  },
];

// ============  STYLED COMPONENTS  ===========
const Hero = styled.section`
  grid-area: hero;
  overflow: hidden;
  position: relative;
  height: 720px;
  width: 100%;
  //   top: 104px;
`;
const GradientOverlay = styled.div`
  background: linear-gradient(
    110.05deg,
    rgba(0, 0, 0, 0.493) -16.93%,
    rgba(0, 0, 0, 0) 109.91%,
    rgba(0, 0, 0, 0) 109.92%
  );
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
const HeroItem = styled.div`
  width: 100%;
  height: 100%;
`;
const Image = styled(motion.img)`
  position: relative;
  width: 100%;
  height: 100%;
`;
const TextContainer = styled.div`
  position: absolute;
  width: 512px;
  color: #fff;
  font-size: 25px;
  height: 160px;
  top: 200px;
  left: 150px;
  row-gap: 3rem;
  z-index: 2;
  & h1 {
    font-weight: 700;
    margin-bottom: 2rem;
  }
`;
const Right = styled.div`
  height: 56px;
  width: 56px;
  color: var(--light-color);
  position: absolute;
  bottom: 50%;
  right: 15px;
  display: grid;
  place-items: center;
  font-size: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--accent-color);
  cursor: pointer;
  user-select: none;
  z-index: 2;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const Left = styled.div`
  height: 56px;
  width: 56px;
  color: var(--light-color);
  position: absolute;
  bottom: 50%;
  left: 15px;
  display: grid;
  place-items: center;
  font-size: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--accent-color);
  cursor: pointer;
  user-select: none;
  z-index: 2;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const slider = {
  opacity: "1",
  transition: "all 0s ease",
};
const active = {
  opacity: "0",
  transitionDuration: "0s",
  transform: "scale(0.9)",
};

const Banner = () => {
  const { t } = useTranslation();

  const [current, setCurrent] = useState(0);
  const length = images.length;

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <Hero>
      {/* Right and left Arrows */}
      <Left onClick={prevSlide}>
        <ArrowBackIosNewRoundedIcon />
      </Left>
      <Right onClick={nextSlide}>
        <ArrowForwardIosRoundedIcon />
      </Right>

      <GradientOverlay></GradientOverlay>

      {/* Map all items of images array */}
      {images.map((image, index) => {
        return (
          <div style={index === current ? slider : active} key={index}>
            {index === current && (
              <>
                <Image
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 1,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  src={image.url}
                  alt={image.alt}
                ></Image>
                <HeroItem>
                  <TextContainer>
                    <motion.h1
                      initial={{ y: 200, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 1,
                        duration: 1.5,
                        type: "spring",
                        bounce: 0.5,
                      }}
                      className="heading__text"
                    >
                      {t(image.heading)}
                    </motion.h1>
                    <Link to="/shop">
                      <MyButton>{t('Find Products')}</MyButton>
                    </Link>
                  </TextContainer>
                </HeroItem>
              </>
            )}
          </div>
        );
      })}
    </Hero>
  );
};

export default Banner;
