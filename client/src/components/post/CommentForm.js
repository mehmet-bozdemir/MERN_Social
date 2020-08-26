import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  return (  
  <Fragment>
    <div className="m-3 text-center">
        <div className=" p-2 d-inline-block text-white bg-info rounded">
          <h4 className="m-0 font-italic">Leave a comment!</h4>
        </div>
      </div>
      <form className="form mb-3" onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }} >
        <div className="form-group">
            <textarea
              className="form-control"
              style={{height:'150px'}}
              type="text"
              name="text"
              placeholder="comment the post..."
              value={text}
              onChange={(e) => {
                const { value } = e.target;
                setText(value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg text-white">
          SUBMIT
          </button>
      </form>
  </Fragment>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
