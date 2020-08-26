import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProfile, followUser, unfollowUser } from "../../actions/profile";

const ProfileItem = ({
  deleteProfile,
  followUser,
  unfollowUser,
  auth,
  profile: { user, name, company, userImage, _id, posts, following, followers }
}) => {
  const onFollowSubmit = () => followUser(user);
  const onUnFollowSubmit = () => unfollowUser(user);
  return (
    <div className="card bg-white p-3 my-1 shadow mb-5 rounded">
      <div className="row no-gutters">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <img src={userImage} className="card-img rounded-circle" alt="..." />
        </div>
        <div className="col-md-8 d-flex justify-content-center align-items-center">
          <div className="card-body text-center">
            <h1 className="card-title">{name}</h1>
            <span className="badge badge-dark font-italic mr-2">Company</span>
            <h1 className="card-text">{company}</h1>
            <Link to={`/profile/${user}`} className="btn btn-primary">
              View Profile
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deleteProfile(_id)}
                type="button"
                className="btn btn-danger m-1"
              >
                <i className="far fa-trash-alt fa-lg" />
              </button>
            )}
            <div className="d-flex justify-content-around border-top mt-3 pt-3 text-muted font-italic">
              <h6>{posts.length} posts</h6>
              <h6>{followers.length} followers</h6>
              <h6>{following.length} following</h6>
            </div>
            {!auth.loading && user !== auth.user._id && (
              <div>
                {followers.includes(auth.user._id) && (
                  <i className="far fa-check-circle fa-lg text-success" />
                )}
                <form onSubmit={onFollowSubmit} className="d-inline-block">
                  <button className="btn btn-sm btn-outline-info m-1">
                    FOLLOW
                  </button>
                </form>
                <form onSubmit={onUnFollowSubmit} className="d-inline-block">
                  <button className="btn btn-sm btn-outline-info m-1">
                    UNFOLLOW
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  deleteProfile,
  followUser,
  unfollowUser
})(ProfileItem);
