import { Column } from "rbx";
import React, { Fragment, useEffect, useState } from "react";
import { push as Menu } from "react-burger-menu";
import NotesAPI from "../../services/notes.js";
import NotesList from "../notes/list/index.js";
import "../../styles/notes.scss";
import NotesEditor from "../notes/editor/index.js";
import NotesSearch from "../notes/search/index.js";

const Notes = (props) => {

  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState({ title: "", body: "", id: "" })

  async function fetchNotes() {
    const response = await NotesAPI.index()
    if (response.data.length >= 1) {
      setNotes(response.data.reverse())
      setCurrentNote(response.data[0])
    }
    else
      setNotes([])
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const selectNote = (id) => {
    const note = notes.find((note) => {
      return note._id === id
    })
    setCurrentNote(note)
  }

  const updateNote = async (note, params) => {
    const updatedNote = await NotesAPI.update(note._id, params)
    const index = notes.indexOf(note)
    const newNotes = notes
    newNotes[index] = updatedNote.data
    setNotes(newNotes)
    setCurrentNote(updatedNote.data)
  }

  const createNote = async () => {
    await NotesAPI.create()
    fetchNotes()
  }

  const searchNotes = async (query) => {
    const response = await NotesAPI.search(query)
    setNotes(response.data)
  }

  const deleteNote = async (note) => {
    await NotesAPI.delete(note._id)
    fetchNotes()
  }

  return (
    <Fragment>
      <Column.Group className="notes" id="notes">
        <Menu pageWrapId={"notes-editor"} isOpen={props.isOpen} onStateChange={(state) => props.setIsOpen(state.isOpen)}
          disableAutoFocus outerContainerId={"notes"} customBurgerIcon={false} customCrossIcon={false}>
          <Column.Group>
            <Column size={10} offset={1}>
              <NotesSearch fetchNotes={fetchNotes} searchNotes={searchNotes} ></NotesSearch>
            </Column>
          </Column.Group>
          <NotesList notes={notes} deleteNote={deleteNote} createNote={createNote} selectNote={selectNote} currentNote={currentNote} />
        </Menu>
        <Column size={12} className="notes-editor" id="notes-editor">
          <NotesEditor note={currentNote} updateNote={updateNote} ></NotesEditor>
        </Column>
      </Column.Group>
    </Fragment>
  )
}

export default Notes;