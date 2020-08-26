import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const guestLinks = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link
        to="/"
        className="navbar-brand d-flex justify-content-center align-items-center"
      >
        <div>
          <img
            src={require("./instagram.png")}
            alt="navbarBrand"
            style={{ height: "40px" }}
            className="rounded-circle mx-1"
          />
        </div>
        <div style={{ fontSize: "2rem" }}>Instagram</div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse "
        style={{ fontSize: "1.5rem" }}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/profiles" className="nav-link d-flex">
              Profiles
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

  const authLinks = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link
        to="/posts"
        className="navbar-brand d-flex justify-content-center align-items-center"
      >
        <div>
          <img
            src={require("./instagram.png")}
            alt="navbarBrand"
            style={{ height: "40px" }}
            className="rounded-circle mx-1"
          />
        </div>
        <div style={{ fontSize: "2rem" }}>Instagram</div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse"
        style={{ fontSize: "1.5rem" }}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/profiles" className="nav-link d-flex">
              <i className="fas fa-users m-1"></i>
              <span className="d-none d-sm-block"> Profiles</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/" className="nav-link d-flex">
              <i className="fas fa-user m-1" />
              <span className="d-none d-sm-block"> Dashboard</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/posts" className="nav-link d-flex">
              <i className="fas fa-blog m-1" />
              <span className="d-none d-sm-block">Posts</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/" className="nav-link d-flex" onClick={logout}>
              <i className="fas fa-sign-out-alt m-1" />
              <span className="d-none d-sm-block"> Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

  return (
    !loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
