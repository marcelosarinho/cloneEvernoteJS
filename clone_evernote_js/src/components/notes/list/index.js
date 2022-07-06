import { Button, Column, List, Tag, Title } from "rbx";
import React, { Fragment } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const NotesList = (props) => {
  return (
    <Fragment>
      <Column.Group breakpoint="mobile">
        <Column size={6} offset={1}>
          <Title size={6}>
            {props.notes.length} Notas
          </Title>
        </Column>
        <Column size={2}>
          <Button state="active" outlined color="customPurple" size="small" onClick={() => props.createNote()}>
            Nota +
          </Button>
        </Column>
      </Column.Group>
      <List className="notes-list">
        {props.notes.map((note, key) =>
          <List.Item key={key} active={note === props.currentNote} onClick={() => props.selectNote(note._id)}>
            <Title size={6}>
              {note.title.replace(/(<([^>]+)>)/ig, "").substring(0, 15)}
            </Title>
            <Title size={6}>
              {note.body.replace(/(<([^>]+)>)/ig, "").substring(0, 30)}
            </Title>
            <Column.Group breakpoint="mobile">
              <Column size={10}>
                <Tag color="dark">
                  {moment(note.createdAt).format("DD/MM")}
                </Tag>
              </Column>
              <Column size={2}>
                <FontAwesomeIcon color="grey" icon={faTrash} onClick={() => props.deleteNote(note)}></FontAwesomeIcon>
              </Column>
            </Column.Group>
          </List.Item>
        )}
      </List>
    </Fragment>
  )
}

export default NotesList;