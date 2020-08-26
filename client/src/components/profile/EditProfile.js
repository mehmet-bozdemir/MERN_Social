import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  editProfile,
  history,
  getCurrentProfile
}) => {
  const [text, setText] = useState(profile.about);
  const [workPlace, setWorkPlace] = useState(profile.company);
  const [file, setFile] = useState("");

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile, loading]);

  const onSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("about", text);
    fd.append("company", workPlace);
    fd.append("userImage", file);
    editProfile(fd, history, true);
    setText("");
    setWorkPlace("");
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>

      <form className="form" onSubmit={onSubmit} encType="multipart/form-data">
        <div className="form-group">
          <img
            src={profile.userImage}
            style={{ height: "200px", width: "200px" }}
            alt="..."
            className="form-control rounded-circle"
          />
          <br />
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
            value={workPlace}
            onChange={(e) => {
              const { value } = e.target;
              setWorkPlace(value);
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

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
