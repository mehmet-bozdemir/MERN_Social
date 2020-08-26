import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("text", text);
    fd.append("postImage", file);
    addPost(fd);
    setText("");
  };

  return (
    <Fragment>
      <div className="m-3 text-center">
        <div className="p-2 d-inline-block text-white bg-info rounded">
          <h4 className="m-0 font-italic">Post your blog!</h4>
        </div>
      </div>
      <form className="form mb-3" onSubmit={onSubmit}>
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
          <label htmlFor="company">Post</label>
          <textarea
            className="form-control"
            style={{ height: "150px" }}
            type="text"
            name="text"
            value={text}
            placeholder="Create a post"
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
