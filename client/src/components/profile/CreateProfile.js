import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [text, setText] = useState("");
  const [company, setCompany] = useState("");
  const [file, setFile] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("company", company);
    fd.append("about", text);
    fd.append("userImage", file);
    createProfile(fd, history, true);
    setText("");
    setCompany("");
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <form className="form" onSubmit={onSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            className="form-control-file"
            type="file"
            accept="image/*"
            name="userImage"
            id="userImage"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            className="form-control"
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => {
              const { value } = e.target;
              setCompany(value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            className="form-control"
            style={{ height: "150px" }}
            type="text"
            placeholder="About"
            name="about"
            value={text}
            onChange={(e) => {
              const { value } = e.target;
              setText(value);
            }}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
