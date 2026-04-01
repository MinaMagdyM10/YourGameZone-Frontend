import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiExitDoor } from "react-icons/gi";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { getWishlist } from "../utils/wishlist";
import { getCart } from "../utils/cart";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCartCount = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser?.role === "admin") {
      setCartCount(0);
      return;
    }

    try {
      const cart = await getCart();
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error("Error updating cart count:", error);
      setCartCount(0);
    }
  };

  const updateWishlistCount = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser || currentUser.role === "admin") {
      setWishlistCount(0);
      return;
    }

    try {
      const wishlist = await getWishlist();
      setWishlistCount(wishlist.length);
    } catch (error) {
      console.error("Error updating wishlist count:", error);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
    updateCartCount();
    updateWishlistCount();
  }, [location]);

  useEffect(() => {
    const handleCartUpdate = () => updateCartCount();
    const handleWishlistUpdate = () => updateWishlistCount();

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("redirectAfterLogin");

    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("wishlistUpdated"));

    setUser(null);
    navigate("/login");
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const isAdmin = user?.role === "admin";

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          YourGameZone
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>
            )}

            {!isAdmin && (
              <>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <Link
                    className="theme-icon-btn wishlist-icon-wrapper"
                    to="/wishlist"
                    title="Wishlist"
                  >
                    <FaHeart />
                    {user && wishlistCount > 0 && (
                      <span className="wishlist-badge">{wishlistCount}</span>
                    )}
                  </Link>
                </li>

                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <Link
                    className="theme-icon-btn cart-icon-wrapper"
                    to="/cart"
                    title="Cart"
                  >
                    <FaShoppingCart />
                    {cartCount > 0 && (
                      <span className="cart-badge">{cartCount}</span>
                    )}
                  </Link>
                </li>
              </>
            )}

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button
                type="button"
                className="theme-icon-btn"
                onClick={toggleTheme}
                title="Toggle theme"
              >
                {darkMode ? <MdLightMode /> : <MdDarkMode />}
              </button>
            </li>

            {user && (
              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <button
                  type="button"
                  className="theme-icon-btn logout-icon-btn"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <GiExitDoor />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;