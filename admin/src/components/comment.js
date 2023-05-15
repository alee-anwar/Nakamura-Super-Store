 // renderInput={(params) => (
                        //   <TextField
                        //     {...params}
                        //     // margin="dense"
                        //     fullWidth
                        //     size="small"
                        //     required
                        //     sx={{
                        //       "& .MuiInputBase-root": {
                        //         height: "32px", // Adjust the desired height here
                        //       },
                        //     }}
                        //   />
                        // )}


                        <Grid container item spacing={2} direction="column" md={4}>
                        <Grid item>
                          <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                            <FormControl required>
                              <FormLabel>Category</FormLabel>
                              <FormGroup>
                                {categories.map((category) => (
                                  <FormControlLabel
                                    key={category}
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.category && Boolean(errors.category)}
                                    helperText={touched.category && errors.category}
                                    control={
                                      <Checkbox
                                        size="small"
                                        disableRipple={true}
                                        sx={{ color: "#757575" }}
                                      />
                                    }
                                    label={
                                      <Typography sx={{ color: "#757575" }}>
                                        {category}
                                      </Typography>
                                    }
                                    sx={{ mb: -1 }}
                                  />
                                ))}
                              </FormGroup>
                            </FormControl>
                          </Paper>
                        </Grid>
            
                        <Grid item>
                          <Paper elevation={3} sx={{ p: 3, height: "auto" }}>
                            <FormLabel>Sub Category</FormLabel>
                            <FormGroup
                            // value={subcategory}
                            // onChange={(e) => setSubCategory(e.target.value)}
                            >
                              {subcategories.map((subcategory, index) => (
                                <FormControlLabel
                                  key={index}
                                  value={subcategory.value}
                                  control={
                                    <Checkbox
                                      size="small"
                                      disableRipple={true}
                                      sx={{ color: "#757575" }}
                                      // checked={checkedItems[subcategory.value] || false}
                                      // onChange={handleChange}
                                    />
                                  }
                                  label={
                                    <Typography sx={{ color: "#757575" }}>
                                      {subcategory.label}
                                    </Typography>
                                  }
                                  sx={{ mb: -1 }}
                                />
                              ))}
                            </FormGroup>
                          </Paper>
                        </Grid>
                      </Grid>



        {/* <Grid item sm={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                        name="date"
                        value={formik.values.date}
                        // onChange={(newValue) =>
                        //   formik.setFieldValue("date", parseISO(newValue))
                        // }
                        onChange={(newValue) => formik.setFieldValue('date', newValue)}

                        onBlur={formik.handleBlur}
                        // sx={{
                        //   width: "100%",
                        //   marginTop: 1,
                        //   "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        //     paddingTop: "8.5px",
                        //     paddingBottom: "8.5px",
                        //   },
                        // }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            fullWidth
                            size="small"
                            error={formik.touched.date && formik.errors.date}
                            helperText={formik.touched.date && formik.errors.date}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid> */}