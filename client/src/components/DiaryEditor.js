// This is a component used in NewDiary and EditDiary.

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Container, Input } from 'reactstrap'
import ReactQuill from 'react-quill'
import PropTypes from 'prop-types'
import { addDiary, editDiary } from '../actions/diaryActions'
import { encryptContent, decryptContent } from '../encryption'
import CreateSecretModal from './CreateSecretModal'

class DiaryEditor extends Component {
  state = {
    title: '',
    body: ''
  };

  static propTypes = {
    placeholder: PropTypes.string,
    diary: PropTypes.object,
    action: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    secret: PropTypes.object,
    editDiary: PropTypes.func
  };

  componentDidMount () {
    if (this.props.action === 'create') return

    const { diary, secret } = this.props
    const secretValue = secret[diary._id]
    this.setState({
      title: diary.title,
      body: decryptContent(diary.body, secretValue)
    })
  }

  updateTitleState = e => {
    this.setState({ title: e.target.value })
  };

  updateEditorState = value => {
    this.setState({ body: value })
  };

  handleSave = () => {
    const { action, history, diary, secret } = this.props
    const { title, body } = this.state
    const secretValue = secret[diary._id]
    const encryptedBody = encryptContent(body, secretValue)
    action !== 'create' &&
      this.props.editDiary(diary._id, { title, body: encryptedBody }, history)
  };

  modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  };

  formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ];

  render () {
    const { title, body } = this.state
    const { action } = this.props
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
        {action === 'create' ? (
          <CreateSecretModal body={body} title={title} />
        ) : (
          <Button
            color="dark"
            style={{ marginTop: '6rem' }}
            onClick={this.handleSave}
            block
          >
            Save
          </Button>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  secret: state.diary.secret
})

export default connect(mapStateToProps, { addDiary, editDiary })(
  withRouter(DiaryEditor)
)
