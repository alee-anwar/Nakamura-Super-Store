import React, { useState } from 'react';

function Checkout({ cartItems, totalCost }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // TODO: Submit form data to backend API or server for order processing
    console.log('Order placed:', { name, address, phoneNumber, cartItems, totalCost });
    // TODO: Show confirmation message and clear cart state data
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Order Summary:</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            {item.productTitle} x {item.quantity} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Cost: ${totalCost}</p>
      <h2>Shipping Information:</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
