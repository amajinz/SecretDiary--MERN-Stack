// This is a component used in NewDiary and EditDiary.

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Container, Input } from "reactstrap";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import { addDiary, editDiary } from "../actions/diaryActions";
import { decryptContent } from "../encryption";

class DiaryEditor extends Component {
  state = {
    title: "",
    body: ""
  };

  static propTypes = {
    placeholder: PropTypes.string,
    diary: PropTypes.object,
    action: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.props.action === "create") return;
    const { diary } = this.props;
    this.setState({
      title: diary.title,
      body: decryptContent(diary.body)
    });
  }

  updateTitleState = e => {
    this.setState({ title: e.target.value });
  };

  updateEditorState = value => {
    this.setState({ body: value });
  };

  handleSave = () => {
    const { action, history, diary } = this.props;
    const { title, body, secret } = this.state;

    if (action === "create") {
      this.props.addDiary({ title, body }, history, secret);
    } else {
      this.props.editDiary(diary._id, { title, body }, history, secret);
    }
  };

  modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video"],
      ["clean"]
    ],
    clipboard: {
      matchVisual: false
    }
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video"
  ];

  render() {
    const { title, body } = this.state;
    return (
      <Container>
        <Input
          type="text"
          name="title"
          value={title}
          id="title"
          className="mb-3"
          onChange={this.updateTitleState}
        />
        <ReactQuill
          className="editor-container"
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          value={body}
          onChange={this.updateEditorState}
        />

        <Button
          color="dark"
          style={{ marginTop: "6rem" }}
          onClick={this.handleSave}
          block
        >
          Save
        </Button>
      </Container>
    );
  }
}

export default connect(null, { addDiary, editDiary })(withRouter(DiaryEditor));
