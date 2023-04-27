import React from "react";
import styled from "styled-components";
// import { motion } from "framer-motion";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const NavSearchBar = styled.div`
  position: relative;
  width: 200px;
  height: 36px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  transition: all 1s ease;
  &:active {
    transform: scale(0.95);
  }
`;

const SearchInput = styled.input`
  position: relative;
  height: 100%;
  width: 90%;
  border: none;
  font-size: var(--text-font);
  padding-left: 14px;
`;

const SearchBar = () => {
  return (
      <NavSearchBar>
        <SearchRoundedIcon/>
        <SearchInput placeholder="Search food..." />
      </NavSearchBar>
  );
};

export default SearchBar;
