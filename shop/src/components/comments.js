
  // const handleUpdateQuantity = (itemId, newQuantity) => {
  //   if (newQuantity <= 0) {
  //     newQuantity = 1; // Set the new quantity to 0 if it's less than 0
  //   }

  //   const updatedItems = cartItems.map((item) => {
  //     if (item._id === itemId) {
  //       item.quantity = newQuantity;
  //     }
  //     return item;
  //   });
  //   setCartItems(updatedItems);

  //   const totalCost = updatedItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  //   setTotalCost(totalCost);
  // };




    // const handleQuantityChange = (event) => {
  //   let value = parseInt(event.target.value);
  //   value = isNaN(value) ? 1 : value; // Set default value to 1 if value is NaN

  //   // Adjust the value to be within the valid range
  //   value = Math.max(1, Math.min(value, stock));

  //   setQuantity(value);
  //   setProductQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [_id]: value,
  //   }));

  //   setAvailableStock(stock - value);
  // };
