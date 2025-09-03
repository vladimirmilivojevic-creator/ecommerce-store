import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    const loadOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/orders/${user.id}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Error loading orders");
      }
    };
    loadOrders();
  }, [user]);

  if (!user) {
    return <p className="auth-required">Please login to view your orders.</p>;
  }

  return (
    <div className="orders-page">
      <h2>📦 My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">You don't have any orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((o) => (
            <div key={o.id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{o.id}</span>
                <span className="order-date">{new Date(o.created_at).toLocaleString()}</span>
              </div>
              <div className="order-body">
                <p><b>Total:</b> ${o.total}</p>
                <p><b>Address:</b> {o.address}</p>
                <p><b>Phone:</b> {o.phone}</p>
              </div>
              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {JSON.parse(o.items).map((item, idx) => (
                    <li key={idx} className="order-item">
                      <img src={item.image_url} alt={item.name} className="order-item-img" />
                      <span>{item.name} - ${item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
