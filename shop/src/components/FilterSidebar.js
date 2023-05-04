import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from '@mui/material';

const FilterSidebar = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleDepartmentChange = (event) => {
    const { name } = event.target;
    setSelectedDepartments((prevSelectedDepartments) => {
      if (prevSelectedDepartments.includes(name)) {
        return prevSelectedDepartments.filter((department) => department !== name);
      } else {
        return [...prevSelectedDepartments, name];
      }
    });
  };

  const handleBrandChange = (event) => {
    const { name } = event.target;
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(name)) {
        return prevSelectedBrands.filter((brand) => brand !== name);
      } else {
        return [...prevSelectedBrands, name];
      }
    });
  };

  return (
    <Paper  elevation={2} style={{ padding: '16px', width:'auto', height:'auto'}}>
    <FormControl component="fieldset" p={2}>
      <Typography variant="h6">Departments</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={selectedDepartments.includes('Fruits & Vegetables')} onChange={handleDepartmentChange} name="Fruits & Vegetables" />}
          label="Fruits & Vegetables"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedDepartments.includes('Pantry')} onChange={handleDepartmentChange} name="Pantry" />}
          label="Pantry"
        />
      </FormGroup>
      <Typography variant="h6">Brands</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={selectedBrands.includes('Bare')} onChange={handleBrandChange} name="Bare" />}
          label="Bare"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedBrands.includes('Bake')} onChange={handleBrandChange} name="Bake" />}
          label="Bake"
        />
      </FormGroup>
    </FormControl>
    </Paper>
  );
};

export default FilterSidebar;
