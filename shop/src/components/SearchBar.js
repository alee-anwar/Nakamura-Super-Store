import { Box, IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(search);
  }, [search]);

  const SearchChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid lightgrey",
        borderRadius: "15px",
        pl: 2,
      }}
      variant="outlined"
    >
      <InputBase
        placeholder="Search..."
        value={search}
        onChange={SearchChange}
      />

      <IconButton
        aria-label="search"
        onClick={() => {
          navigate("/search", { state: { Data: search } });
        }}
      >
        <SearchIcon color="primary" fontSize="medium" />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
