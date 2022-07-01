import { Card, Column, Container, Section, Title } from "rbx";
import React, { Fragment } from "react";
import Header from "../../../components/header/index.js";
import "../../../styles/auth.scss";
import logoImage from "../../../assets/images/logo.png";
import Login from "../../../components/auth/login_form/index.js";

const LoginScreen = () => {
  return (
    <Fragment>
      <Header />
      <Section size="medium" className="auth-section">
        <Container>
          <Column.Group centered>
            <Column size={3}>
              <Card>
                <Card.Content>
                  <Section>
                    <Column.Group centered>
                      <Column size={12}>
                        <img src={logoImage} alt="logo"></img>
                      </Column>
                    </Column.Group>
                    <Column.Group>
                      <Column>
                        <Title size={6} className="has-text-grey has-text-centered">Suas notas na nuvem</Title>
                      </Column>
                    </Column.Group>
                    <Login />
                  </Section>
                </Card.Content>
              </Card>
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </Fragment>
  )
}

export default LoginScreen;