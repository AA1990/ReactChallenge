import styled from 'styled-components'
import Section from 'Components/Layout/Section'
import { styleConstants } from 'Config'

const StyledPage = styled(Section)`
  background-color: ${styleConstants.colors.greyscale600};
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;  
  padding: 1vh 2vw;
`

export {
  StyledPage,
}
