import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, postImage, postedBy, user, likes, comments, date },
  showActions,
  getProfiles,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  let item = profiles.filter((img) => user === img.user);
  const foundImg = item.map((element) => element.userImage).toString();

  return loading || profiles === null ? (
    <Spinner />
  ) : (
    <div className="card bg-white p-3 my-1 shadow mb-5 rounded">
      <div className="d-flex justify-content-center">
        <img
          className="rounded-circle"
          src={`/${foundImg}`}
          style={{ height: "80px" }}
          alt="ccc"
        />
      </div>
      <div className="d-flex justify-content-center">
        <Link to={`/profile/${user}`}>
          <h4>{name}</h4>
        </Link>
      </div>

      <div className="card-body text-center">
        <img
          src={`/${postImage}`}
          alt="ccc"
          className="mb-2"
          style={{ width: "80%" }}
        />
        <p className="card-text">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light m-1"
            >
              <i className="fas fa-thumbs-up fa-lg" />{" "}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light m-1"
            >
              <i className="fas fa-thumbs-down fa-lg" />
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary m-1">
              <i className="far fa-comments fa-lg"></i>{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type="button"
                className="btn btn-danger m-1"
              >
                <i className="far fa-trash-alt fa-lg" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getProfiles,
  addLike,
  removeLike,
  deletePost
})(PostItem);
