import { Card, Column, Container, Section, Title } from "rbx";
import React, { Fragment } from "react";
import LoggedHeader from "../../../components/header_logged/index.js";
import UsersEdit from "../../../components/users/edit/index.js";
import UsersEditPassword from "../../../components/users/edit_password/index.js";
import UsersDelete from "../../../components/users/delete/index.js";

const UsersEditScreen = () => {
  return (
    <Fragment>
      <LoggedHeader />
      <Section className="users-section" size="small">
        <Container>
          <Column.Group className="users-edit" centered>
            <Column size={4}>
              <Title size={5} className="has-text-grey has-text-left">
                Informações Pessoais
              </Title>
              <Card>
                <Card.Content>
                  <UsersEdit />
                </Card.Content>
              </Card>
            </Column>
          </Column.Group>
          <Column.Group className="users-edit" centered>
            <Column size={4}>
              <Title size={5} className="has-text-grey has-text-left">
                Senha
              </Title>
              <Card>
                <Card.Content>
                  <UsersEditPassword />
                </Card.Content>
              </Card>
            </Column>
          </Column.Group>
          <Column.Group centered>
            <Column size={4} className="has-text-right">
              <UsersDelete />
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </Fragment>
  )
}

export default UsersEditScreen;