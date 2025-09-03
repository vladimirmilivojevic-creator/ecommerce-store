import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Checkout({ user, cart, onOrderSuccess }) {
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/checkout", {
        userId: user.id,
        cart,
        address,
        phone,
      });
      toast.success(res.data.message);
      onOrderSuccess(); // prazni korpu
      setAddress("");
      setPhone("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Checkout failed");
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="checkout-box">
      <h3>Checkout</h3>
      <form onSubmit={handleCheckout} className="checkout-form">
        <input
          type="text"
          placeholder="Delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit" className="checkout-btn">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
