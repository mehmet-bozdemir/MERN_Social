import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <div>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div className="col-md-12">
          <div className="text-center">
            <Link to="/profiles" className="btn btn-info m-1">
              Back To Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-info m-1">
                  Edit Profile
                </Link>
              )}
          </div>
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="text-center">
              <img
                src={`/${profile.userImage}`}
                style={{ width: "50%" }}
                className="card-img rounded-circle"
                alt="..."
              />
            </div>
            <div className="card-body text-center">
              <h3 className="card-title">{profile.name}</h3>
              <span className="badge badge-dark font-italic mr-2">Company</span>
              <h3 className="card-text">{profile.company}</h3>
              <span className="badge badge-dark">About</span>
              <p className="card-text">{profile.about}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
