import { Column, List } from "rbx";
import React, { Fragment, useEffect, useState } from "react";
import { push as Menu } from "react-burger-menu";
import NotesAPI from "../../services/notes.js";
import NotesList from "../notes/list/index.js";
import "../../styles/notes.scss";

const Notes = (props) => {

  const [currentNote, setCurrentNote] = useState({ title: "", body: "", id: "" })
  const [notes, setNotes] = useState([])

  async function fetchNotes() {
    const response = await NotesAPI.index()
    if (response.data.length >= 1) {
      setNotes(response.data.reverse())
      setCurrentNote(response.data[0])
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const selectNote = (id) => {
    const note = notes.find(note => {
      return note._id === id
    })
    setCurrentNote(note)
  }

  return (
    <Fragment>
      <Column.Group className="notes" id="notes">
        <Menu pageWrapId={"notes-editor"} isOpen={props.isOpen} onStateChange={(state) => props.setIsOpen(state.isOpen)}
          disableAutoFocus outerContainerId={"notes"} customBurgerIcon={false} customCrossIcon={false}>
          <Column.Group>
            <Column size={10} offset={1}>
              Procurar
            </Column>
          </Column.Group>
          <NotesList notes={notes} selectNote={selectNote} currentNote={currentNote} />
        </Menu>
        <Column size={12} className="notes-editor" id="notes-editor">
          Editor
        </Column>
      </Column.Group>
    </Fragment>
  )
}

export default Notes;