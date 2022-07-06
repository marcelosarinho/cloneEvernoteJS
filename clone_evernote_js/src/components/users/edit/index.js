import { Button, Column, Control, Field, Help, Input, Label } from "rbx";
import React, { Fragment, useEffect, useState } from "react";
import UsersAPI from "../../../services/users.js";

const UsersEdit = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(null)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      await UsersAPI.updateNameAndEmail({ name: name, email: email })
      setStatus("success")
    } catch (error) {
      setStatus("error")
    }
  }

  const userInit = async () => {
    const user = await JSON.parse(localStorage.getItem("user"))
    setName(user.name)
    setEmail(user.email)
  }

  useEffect(() => {
    userInit()
  }, [])

  return (
    <Fragment>
      <form onSubmit={onSubmitHandler}>
        <Field>
          <Control>
            <Label className="has-text-grey">Nome</Label>
            <Input required type="name" name="name" value={name || ""} onChange={(e) => setName(e.target.value)}></Input>
          </Control>
        </Field>
        <Field>
          <Control>
            <Label className="has-text-grey">Email</Label>
            <Input required type="email" name="email" value={email || ""} onChange={(e) => setEmail(e.target.value)}></Input>
          </Control>
        </Field>
        <Field>
          <Control>
            <Column.Group>
              <Column className="has-text-right">
                <Button color="customPurple" outlined>Atualizar</Button>
              </Column>
            </Column.Group>
          </Control>
        </Field>
        {status === "error" && <Help color="danger">Erro ao atualizar informações!</Help>}
        {status === "success" && <Help color="success">Atualizado!</Help>}
      </form>
    </Fragment>
  )
}

export default UsersEdit;