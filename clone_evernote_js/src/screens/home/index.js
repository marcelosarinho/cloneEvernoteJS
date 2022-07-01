import React, { Fragment } from "react";
import Header from "../../components/header/index.js";
import { Section, Title, Column, Container } from "rbx";
import homeImage from "../../assets/images/presentation.png";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <Fragment>
      <Header />
      <Section size="medium" className="home-section">
        <Container>
          <Column.Group>
            <Column size={5}>
              <Title size={2} className="has-text-white" spaced>
                Crie notas facilmente e acesse na nuvem, quando desejar!
              </Title>
              <Title size={5} className="has-text-light" spaced subtitle >
                Esse projeto é um "clone" do Evernote. O projeto foi ensinado no curso Programador FullStack Javascript, da OneBitCode.
                <br />
                <br />
                As tecnologias utilizadas nesse projeto são: HTML, CSS, RBX, Bulma, React, NodeJS, MongoDB, Mongoose, Express, entre outras.
              </Title>
              <Link to="/register" className="button is-outlined is-white is-large">
                <strong>Registre-se gratuitamente</strong>
              </Link>
            </Column>
            <Column size={6} offset={1}>
              <img src={homeImage} alt="home"></img>
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </Fragment>
  )
}


export default HomeScreen;