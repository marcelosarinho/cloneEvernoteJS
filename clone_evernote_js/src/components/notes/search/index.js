import { Column, Input } from "rbx";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const NotesSearch = (props) => {

  const [query, setQuery] = useState("")

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter")
      props.searchNotes(query)
  }

  return (
    <Column.Group className="is-vcentered" breakpoint="mobile">
      <Column size="9" offset={1}>
        <Input type="text" value={query} name={query} onKeyDown={onKeyDownHandler} placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}>
        </Input>
      </Column>
      <Column mobile={2} size={1}>
        <a href="#" onClick={() => {
          props.fetchNotes()
          setQuery("")
        }}>
          <FontAwesomeIcon color="grey" className="is-pulled left" icon={faTimes}></FontAwesomeIcon>
        </a>
      </Column>
    </Column.Group>
  )
}

export default NotesSearch;