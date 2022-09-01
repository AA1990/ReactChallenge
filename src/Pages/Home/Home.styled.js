import styled from 'styled-components'
import {
  Section
} from 'Components/Layout'

const StyledHome = styled(Section)`
  color: #333;
  height: 100vh;
  width: 100vw;

  img {
    max-width: 30vw;
  }
  p {
    margin-top: 4vh;
    max-width: 80vw;
    text-align: center;
    width: 600px;
  }
  .contact-us {
    margin-top: 0vh;
  }
`

export {
  StyledHome,
}
