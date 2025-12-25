import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center py-5">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center py-5">Product not found</p>;
  }

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-start">

        {/* IMAGE */}
        <div className="col-12 col-md-6 text-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-main-img"
          />
        </div>

        {/* INFO */}
        <div className="col-12 col-md-6">
          <h2 className="mb-3">{product.title}</h2>

          <p className="text-muted mb-2">
            Category: {product.category}
          </p>

          <h3 className="product-price-big mb-3">
            ${product.price}
          </h3>

          <p className="mb-4">
            {product.description}
          </p>

          <button
            className="btn tup-btn px-5 py-2"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}