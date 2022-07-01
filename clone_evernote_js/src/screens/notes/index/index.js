import React, { Fragment, useState } from "react";
import LoggedHeader from "../../../components/header_logged/index.js";
import Notes from "../../../components/notes/index.js";

const NotesScreen = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Fragment>
      <LoggedHeader setIsOpen={setIsOpen} />
      <Notes isOpen={isOpen} setIsOpen={setIsOpen} />
    </Fragment>
  )
}

export default NotesScreen;