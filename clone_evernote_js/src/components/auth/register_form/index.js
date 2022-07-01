import { Input, Button, Column, Control, Field, Label, Help } from "rbx";
import React, { useState, Fragment } from "react";
import { Navigate } from "react-router-dom";
import UsersAPI from "../../../services/users.js";


const Register = () => {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [navigateToLogin, setNavigateToLogin] = useState(false)

  if (navigateToLogin) {
    return (
      <Navigate to="/login"></Navigate>
    )
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await UsersAPI.register({ name: name, email: email, password: password })
      setNavigateToLogin(true)
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
              <Label size="small">Nome</Label>
              <Control>
                <Input type="name" name="name" required value={name} onChange={e => setName(e.target.value)}></Input>
              </Control>
            </Field>
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
                    <a className="button is-white has-text-customPurple" onClick={e => setNavigateToLogin(true)}>Login</a>
                  </Column>
                  <Column>
                    <Button color="customPurple" outlined>Registrar</Button>
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

export default Register;