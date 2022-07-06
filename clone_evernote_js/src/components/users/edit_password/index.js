import { Button, Column, Control, Field, Help, Input, Label } from "rbx";
import React, { Fragment, useState } from "react";
import UsersAPI from "../../../services/users.js";

const UsersEditPassword = () => {

  const [password, setPassword] = useState("")
  const [status, setStatus] = useState(null)
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (password === passwordConfirm) {
      try {
        await UsersAPI.updatePassword({ password: password })
        setStatus("success")
      } catch (error) {
        setStatus("error")
      }
    }
    else
      setStatus("errorPasswordConfirm")
  }

  return (
    <Fragment>
      <form onSubmit={onSubmitHandler}>
        <Field>
          <Control>
            <Label className="has-text-grey">Senha</Label>
            <Input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} ></Input>
          </Control>
        </Field>
        <Field>
          <Control>
            <Label className="has-text-grey">Confirmação de senha</Label>
            <Input required type="password" name="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}></Input>
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
        {status === "error" && <Help color="danger">Erro ao atualizar senha!</Help>}
        {status === "errorPasswordConfirm" && <Help color="danger">As senhas não conferem!</Help>}
        {status === "success" && <Help color="success">Atualizado!</Help>}
      </form>
    </Fragment>
  )
}

export default UsersEditPassword;