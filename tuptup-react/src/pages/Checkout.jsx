import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, totalPrice } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Order placed! 🎉");
  }

  return (
    <div className="container py-5">
      <h2>Checkout</h2>

      {/* CART SUMMARY */}
      <div className="mb-4">
        {cart.map(item => (
          <div key={item.id}>
            {item.title} × {item.qty} — ${item.price * item.qty}
          </div>
        ))}
        <strong>Total: ${totalPrice.toFixed(2)}</strong>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <button type="submit">Place order</button>
      </form>
    </div>
  );
}