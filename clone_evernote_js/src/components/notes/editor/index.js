import React, { Fragment, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NotesEditor = (props) => {

  const [currentContent, setCurrentContent] = useState()
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    setCurrentContent(props.note.body)
  }, [props.note])

  const updateNoteContent = (content) => {
    const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 30)
    props.updateNote(props.note, { "title": title, "body": content })
  }

  const onChangeHandler = (content, delta, source) => {
    clearTimeout(timer)
    if (source === "user") {
      setCurrentContent(content)
      setTimer(setTimeout(() => updateNoteContent(content), 3000))
    }
  }

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean'],
    ]
  }

  return (
    <Fragment>
      <ReactQuill onChange={onChangeHandler} value={currentContent} modules={modules}></ReactQuill>
    </Fragment>
  )
}

export default NotesEditor;