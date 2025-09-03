import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ImageWithLoader from "../ImageWithLoader";

function Loading() {
  return <div className="spinner"></div>;
}

function Shop({ user }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        if (mounted) setProducts(res.data);
      } catch (e) {
        console.error(e);
        toast.error("Error loading products");
      } finally {
        if (mounted) setLoading(false);
      }

      if (user) {
        try {
          const cartRes = await axios.get(`http://localhost:5000/get-cart/${user.id}`);
          if (mounted) setCart(cartRes.data.cart || []);
        } catch (e) {
          console.error(e);
        }
      }
    };

    load();
    return () => { mounted = false; };
  }, [user]);

  const persistCart = async (newCart) => {
    setCart(newCart);
    if (user) {
      try {
        await axios.post("http://localhost:5000/save-cart", {
          userId: user.id,
          cart: newCart,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addToCart = (product) => {
    const newCart = [...cart, product];
    persistCart(newCart);
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    persistCart(newCart);
    toast.info("Item removed from cart");
  };

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
      setCart([]); // isprazni korpu
      setAddress("");
      setPhone("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Checkout failed");
    }
  };

  if (!user) {
    return (
      <div className="auth-required">
        <h2>Please login to view the shop</h2>
      </div>
    );
  }

  if (loading) return <Loading />;

  return (
    <div className="shop-container">
      <h1>E-commerce Store</h1>

      {/* Products */}
      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <ImageWithLoader
              src={p.image_url}
              alt={p.name}
              className="product-img"
            />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><b>${p.price}</b></p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart + Checkout */}
      <div className="shop-layout">
        {/* Cart */}
        <div className="cart-box">
          <h2>🛒 Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="cart-img"
                    onClick={() => window.open(item.image_url, "_blank")}
                  />
                  <span className="cart-text">
                    {item.name} - ${item.price}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Checkout */}
        <div className="checkout-box">
          <h2>💳 Checkout</h2>
          {cart.length === 0 ? (
            <p className="empty-checkout">Add items to cart before checkout.</p>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
