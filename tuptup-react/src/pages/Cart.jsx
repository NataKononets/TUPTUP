import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

export default function Cart() {
  const {
    cart,
    addToCart,
    decreaseQty,
    removeFromCart,
    totalPrice
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/shop">Go to shop</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>

      {cart.map(item => (
        <div
          key={item.id}
          className="d-flex gap-3 align-items-center mb-4 border-bottom pb-3"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            width="80"
          />

          <div className="flex-grow-1">
            <h5>{item.title}</h5>
            <p>${item.price}</p>

            <div className="d-flex align-items-center gap-2">
              <button onClick={() => decreaseQty(item.id)}>
                <FiMinus />
              </button>

              <span>{item.qty}</span>

              <button onClick={() => addToCart(item)}>
                <FiPlus />
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-danger"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      ))}

      <h4>Total: ${totalPrice.toFixed(2)}</h4>

      <Link to="/checkout" className="btn btn-primary mt-3">
        Go to Checkout
      </Link>
    </div>
  );
}