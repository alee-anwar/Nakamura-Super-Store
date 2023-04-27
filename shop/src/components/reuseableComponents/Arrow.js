import styled from "styled-components";
import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

// ================  STYLED COMPONENT  ============
const Right = styled.div`
  opacity: 0.5;
  height: 56px;
  width: 56px;
  color: var(--light-color);
  position: absolute;
  bottom: 55%;
  right: 5px;
  display: grid;
  place-items: center;
  font-size: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ffe033;
  cursor: pointer;
  z-index: 1;
  transition: all 0.2s ease;
  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
    box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const Left = styled.div`
  opacity: 0.5;
  height: 56px;
  width: 56px;
  color: var(--light-color);
  position: absolute;
  bottom: 55%;
  left: 5px;
  display: grid;
  place-items: center;
  font-size: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ffe033;
  cursor: pointer;
  z-index: 1;
  transition: all 0.2s ease;
  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
    box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;

// ==============  JSX STRUCTURE =============

// ARROW RIGHT
export const ArrowRight = ({ onClick }) => {
  return (
    <Right onClick={() => onClick()}>
      <ArrowForwardIosRoundedIcon />
    </Right>
  );
};

// ARROW LEFT
export const ArrowLeft = ({ onClick }) => {
  return (
    <Left onClick={() => onClick()}>
      {" "}
      <ArrowBackIosNewRoundedIcon />{" "}
    </Left>
  );
};
