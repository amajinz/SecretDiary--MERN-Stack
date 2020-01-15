import React, { Component } from 'react'
import { Button, Container, Input } from 'reactstrap'
import ReactQuill from 'react-quill'
import PropTypes from 'prop-types'

class DiaryEditor extends Component {
    state = {
      title: 'Title',
      body: 'Type here ...'
    }

    updateTitleState = e => {
      this.setState({ title: e.target.value })
    }

    updateEditorState = value => {
      this.setState({ body: value })
    }

    modules = {
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' },
          { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      clipboard: {
        matchVisual: false
      }
    }

    formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]

    propTypes = {
      placeholder: PropTypes.string
    }

    render () {
      const { body } = this.state
      return (
        <Container >
          <Input
            type='text'
            name='title'
            placeholder='Title'
            id='title'
            className='mb-3'
            onChange={this.updateTitleState}
          />
          <ReactQuill
            className="editor-container"
            theme="snow"
            modules={this.modules}
            formats={this.formats}
            value={body}
            onChange={this.updateEditorState} />
          <Button color='dark' style={{ marginTop: '6rem' }} block>
                    Save
          </Button>
          <Button color='dark' style={{ marginTop: '1rem' }} block>
                    Save and view
          </Button>
          <Button style={{ marginTop: '1rem' }} onClick={() => console.log('')
          } block>
                    Discard
          </Button>

        </Container >
      )
    }
}

export default DiaryEditor
