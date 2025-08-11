import { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      handleClose();
    } else {
      setIsDrawerOpen(true);
    }
  };

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setIsAnimatingOut(false);
    }, 300); // Match animation duration
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        {/* Search bar */}
        <div className="searchbar">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search Pipedrive" />
        </div>

        {/* Logo */}
        <img
          src="/assets/images/logo.png"
          alt="Logo"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/100x30/143e6f/ffffff?text=Logo";
          }}
        />

        {/* User section */}
        <div className="user-section">
          <div className="action-icons">
            <i className="bx bx-plus"></i>
            <div className="vertical-divider"></div>
            <i className="bx bx-envelope"></i>
            <i className="bx bx-phone"></i>
            <i className="bx bx-calendar"></i>
          </div>

          {/* Direct img without wrapper div */}
          <img
            src="/assets/images/avatar.png"
            alt="User Avatar"
            className="avatar-img"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/30x30/eeeeee/333333?text=PY";
            }}
          />

          <div className="avatar-detail">
            <span className="name">Phyllis Yang</span>
            <span className="role">Silicon Links Inc</span>
          </div>
        </div>

        {/* Mobile Drawer Toggle */}
        <button className="drawer-toggle" onClick={toggleDrawer}>
          <i className="bx bx-menu"></i>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className={`drawer-overlay ${
            isAnimatingOut ? "overlay-fade-out" : "overlay-fade-in"
          }`}
          onClick={handleClose}
        >
          <div
            className={`drawer ${
              isAnimatingOut ? "drawer-slide-out" : "drawer-slide-in"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header with Avatar (direct img) and Close */}
            <div className="drawer-header">
              <div className="avatar-row">
                <img
                  src="/assets/images/avatar.png"
                  alt="User Avatar"
                  className="avatar-img"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/30x30/eeeeee/333333?text=PY";
                  }}
                />
                <div className="avatar-detail">
                  <span className="name">Phyllis Yang</span>
                  <span className="role">Silicon Links Inc</span>
                </div>
              </div>
              <button className="close-btn" onClick={handleClose}>
                <i className="bx bx-x"></i>
              </button>
            </div>

            <div className="horizontal-divider"></div>

            {/* Search in Drawer */}
            <div className="searchbar drawer-search">
              <i className="bx bx-search"></i>
              <input type="text" placeholder="Search Pipedrive" />
            </div>

            {/* Action Icons with Labels */}
            <div className="action-icons drawer-actions">
              <div className="action-item">
                <i className="bx bx-plus"></i>
                <span>Add</span>
              </div>
              <div className="action-item">
                <i className="bx bx-envelope"></i>
                <span>Email</span>
              </div>
              <div className="action-item">
                <i className="bx bx-phone"></i>
                <span>Call</span>
              </div>
              <div className="action-item">
                <i className="bx bx-calendar"></i>
                <span>Calendar</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
