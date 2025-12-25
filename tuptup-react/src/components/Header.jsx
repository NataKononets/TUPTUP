import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalCount } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-bottom sticky-top">
      <div className="container py-3">
        <div className="d-flex align-items-center justify-content-between">

          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <img src={logo} alt="TupTup" height="40" />
            <span className="fs-4 fw-bold text-dark">TupTup</span>
          </Link>

       
          <nav className="d-none d-md-flex gap-4">
            <NavLink className="fs-5 fw-medium text-dark text-decoration-none" to="/">Home</NavLink>
            <NavLink className="fs-5 fw-medium text-dark text-decoration-none" to="/shop">Shop</NavLink>
            <NavLink className="fs-5 fw-medium text-dark text-decoration-none" to="/categories">Categories</NavLink>
            <NavLink className="fs-5 fw-medium text-dark text-decoration-none" to="/contact">Contact</NavLink>
          </nav>

         
          <div className="d-flex align-items-center gap-3">

            <div className="position-relative">
              {!searchOpen ? (
                <button className="btn fs-5" onClick={() => setSearchOpen(true)}>
                  <FaSearch />
                </button>
              ) : (
                <div className="d-flex align-items-center border rounded-pill px-3">
                  <FaSearch className="me-2 text-muted" />
                  <input
                    className="form-control border-0 shadow-none"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="btn p-0 ms-2"
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <Link to="/cart" className="position-relative text-dark text-decoration-none">
              <FaShoppingCart size={20} />
              <span className="d-none d-md-inline">Cart</span>
              {totalCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* BURGER */}
            <button className="btn fs-4 d-md-none" onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="d-md-none mt-3 border-top pt-3">
            <NavLink to="/" className="d-block mb-2" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/shop" className="d-block mb-2" onClick={() => setMenuOpen(false)}>Shop</NavLink>
            <NavLink to="/categories" className="d-block mb-2" onClick={() => setMenuOpen(false)}>Categories</NavLink>
            <NavLink to="/contact" className="d-block" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </div>
        )}
      </div>
    </header>
  );
}