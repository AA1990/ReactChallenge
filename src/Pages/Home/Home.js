import React from 'react';
import { Link } from 'react-router-dom'
import {
  StyledHome,
} from './Home.styled'
import {
  Section,
} from 'Components'
import {
  logo,
} from 'Assets/images'

function Home() {
  return (
    <StyledHome id="home">
      <Section column centered>
        <img src={logo} alt="Meii logo"/>
        <p>COMPANY_NAME REACT PROJECT</p>
        <Link to="login">Log in</Link>
      </Section>
    </StyledHome>
  );
}

export default Home;
