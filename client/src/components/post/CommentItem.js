import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, postedBy, userImage, created },
  auth,
  deleteComment
}) => (
  <div className="card my-1">
    <div className="d-flex justify-content-center">
      <Link to={`/profile/${postedBy}`}>
        <h4>{name}</h4>
        <img
          className="rounded-circle"
          src={`/${userImage}`}
          alt="..."
          style={{ height: "80px" }}
        />
      </Link>
    </div>
    <div className="text-center">
      <p className="my-1 font-italic">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{created}</Moment>
      </p>
      {!auth.loading && postedBy === auth.user._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger m-1"
        >
          <i className="far fa-trash-alt fa-lg" />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
