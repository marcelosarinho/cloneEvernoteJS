import { Button, Column, Dropdown, Navbar } from "rbx";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../styles/header.scss";
import logoWhiteImage from "../../assets/images/logo-white.png";
import UsersAPI from "../../services/users.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const LoggedHeader = (props) => {

  const [navigateToHome, setNavigateToHome] = useState(false)
  const [name, setName] = useState(localStorage.getItem("user"))

  const logout = async () => {
    await UsersAPI.logout()
    setNavigateToHome(true)
  }

  if (navigateToHome) {
    return (
      <Navigate to="/"></Navigate>
    )
  }

  return (
    <Navbar color="customPurple" className="logged-navbar">
      <Navbar.Brand>
        <Column.Group>
          <Column size="11" offset="1">
            <Link to="/notes">
              <img src={logoWhiteImage} alt="logo-white"></img>
            </Link>
          </Column>
        </Column.Group>
        <Navbar.Burger className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Navbar.Burger>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Segment as="div" className="navbar-item navbar-start" align="start">
          <Navbar.Item as="div">
            <Button color="white" outlined className="open-button" onClick={() => props.setIsOpen(true)}>
              <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
            </Button>
          </Navbar.Item>
        </Navbar.Segment>
        <Navbar.Segment as="div" className="navbar-item navbar-end" align="right">
          <Navbar.Item as="div">
            <Dropdown>
              <Dropdown.Trigger>
                <Button className="button" outlined color="white">
                  <span>{JSON.parse(name)["name"]} ▼</span>
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Content>
                  <Dropdown.Item as="div">
                    <Link to="/users/edit">Editar usuário</Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as="div">
                    <a href="#" onClick={e => logout()}>Logout</a>
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Item>
        </Navbar.Segment>
      </Navbar.Menu>
    </Navbar>
  )
}

export default LoggedHeader;