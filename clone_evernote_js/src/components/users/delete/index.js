import { Button } from "rbx";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import UsersAPI from "../../../services/users.js";

const UsersDelete = () => {

  const [navigateToHome, setNavigateToHome] = useState(false)

  const deleteAccount = async () => {
    if (window.confirm("Tem certeza de que deseja deletar a conta?")) {
      await UsersAPI.delete()
      setNavigateToHome(true)
    }
  }

  if(navigateToHome) {
    return (
      <Navigate to="/"></Navigate>
    )
  }

  return (
    <Button color="danger" onClick={() => deleteAccount()}>Excluir conta</Button>
  )
}

export default UsersDelete;