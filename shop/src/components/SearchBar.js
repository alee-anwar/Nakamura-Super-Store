// import { Box, IconButton, InputBase, Paper } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";

// const SearchBar = () => {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(search);
//   }, [search]);

//   const SearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   return (
//     <Paper
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         borderBottom: "1px solid lightgrey",
//         borderRadius: "15px",
//         pl: 2,
//       }}
//       variant="outlined"
//     >
//       <InputBase
//         placeholder="Search..."
//         value={search}
//         onChange={SearchChange}
//       />

//       <IconButton
//         aria-label="search"
//         onClick={() => {
//           navigate("/search", { state: { Data: search } });
//         }}
//       >
//         <SearchIcon color="primary" fontSize="medium" />
//       </IconButton>
//     </Paper>
//   );
// };

// export default SearchBar;

import { Box, IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    console.log(search);
  }, [search]);

  const handleSearch = () => {
    navigate("/search", { state: { Data: search } });
    setSearch(""); // Clear the search input after search
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    // <Paper
    //   sx={{
    //     display: "flex",
    //     alignItems: "center",
    //     borderBottom: "1px solid lightgrey",
    //     // borderRadius: "15px",
    //     pl: 2,

    //   }}
    //   // variant="outlined"
    // >
    <Box
      alignItems="center"
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: "2px solid #FFE033",
        pl: 0.1,
      }}
    >
      {/* <InputBase
        placeholder={t("Search...")}
        value={search}
        onChange={handleInputChange}
      /> */}
      <InputBase
        placeholder={t("Search...")}
        value={search}
        onChange={handleInputChange}
        inputProps={{
          dir: t("Search...") === "لټول..." ? "rtl" : "ltr",
        }}
      />

      <IconButton
        aria-label="search"
        onClick={handleSearch}
        sx={{ p: 0, pl: 1}}
        color="primary"
        disableRipple
      >
        <SearchIcon color="primary" fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
