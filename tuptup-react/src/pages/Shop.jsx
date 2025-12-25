import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Shop() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(4);

  if (loading) {
    return <p className="text-center py-5 fs-5">Loading products…</p>;
  }

  if (error) {
    return <p className="text-center text-danger fs-5">{error}</p>;
  }

  const categories = [
    "all",
    ...new Set(products.map(product => product.category)),
  ];
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(p => p.category === activeCategory);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section className="container py-5">
      {/* TITLE */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Shop</h2>
        <p className="text-muted">
          Find the best products for kids
        </p>
      </div>

      {/* CATEGORIES */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${
              activeCategory === cat
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(4); 
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="row g-4">
        {visibleProducts.map(product => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3">
            <div className="product-card h-100 d-flex flex-column">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="mb-3"
              />

              <h5 className="flex-grow-1">
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-none text-dark"
                >
                  {product.title}
                </Link>
              </h5>

              <p className="fw-semibold mb-3">
                ${product.price.toFixed(2)}
              </p>

              <button
                className="btn tup-btn w-100 mt-auto"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-5">
          <button
            className="btn btn-outline-dark px-5 py-2"
            onClick={() => setVisibleCount(prev => prev + 4)}
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}