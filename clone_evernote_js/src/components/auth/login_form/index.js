import { Button, Column, Control, Field, Help, Input, Label } from "rbx";
import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import UsersAPI from "../../../services/users.js";

const Login = () => {

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [navigateToNotes, setNavigateToNotes] = useState(false)
  const [navigateToRegister, setNavigateToRegister] = useState(false)

  if (navigateToRegister) {
    return (
      <Navigate to="/register"></Navigate>
    )
  } else if (navigateToNotes) {
    return (
      <Navigate to="/notes"></Navigate>
    )
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      await UsersAPI.login({ email: email, password: password })
      setNavigateToNotes(true)
    } catch (error) {
      setError(true)
    }
  }

  return (
    <Fragment>
      <Column.Group centered>
        <form onSubmit={onSubmitHandler}>
          <Column size={12}>
            <Field>
              <Label size="small">Email</Label>
              <Control>
                <Input type="email" name="email" required value={email} onChange={e => setEmail(e.target.value)}></Input>
              </Control>
            </Field>
            <Field>
              <Label size="small">Senha</Label>
              <Control>
                <Input type="password" name="password" required value={password} onChange={e => setPassword(e.target.value)}></Input>
              </Control>
            </Field>
            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column>
                    <a className="button is-white has-text-customPurple" onClick={e => setNavigateToRegister(true)}>Registrar</a>
                  </Column>
                  <Column>
                    <Button color="customPurple" outlined>Login</Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>
            {error &&
              <Help color="danger">
                Email ou senha inválidos!
              </Help>}
          </Column>
        </form>
      </Column.Group>
    </Fragment>
  )
}

export default Login;