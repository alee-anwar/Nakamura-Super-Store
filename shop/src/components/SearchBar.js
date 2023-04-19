import React from 'react'
import styled from "styled-components";

const NavSearchBar = styled.div`
  position: relative;
  width: 450px;
  height: 43px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--light-fill);
  overflow: hidden;
  border-radius: 10px;
  flex: 4;
  transition: all 0.4s ease;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    color: var(--accent-color);
    background-color: var(--light-accent-color);
  }
`;
const SearchInput = styled.input`
  position: relative;
  height: 100%;
  width: 90%;
  background-color: transparent;
  border: none;
  font-size: var(--text-font);
  color: var(--dark-text-color);
`;

const SearchBar = () => {
  return (
    <div>Searchbar</div>
  )
}

export default SearchBar;
