import styled from 'styled-components'
import { Section } from 'Components/Layout'
import { styleConstants } from 'Config'

const StyledNavigation = styled(Section)`
  background-color: ${styleConstants.colors.greyscale200};
  flex: 0;
  padding: 15px 22px;
  padding-top: 30px;
  flex-basis: 130px;
  a {
    margin-bottom: 10px;
    text-decoration: none;
    &:hover {
      color: rebeccapurple;
    }
  }
  hr {
    width: 100%;
  }
`

export {
  StyledNavigation,
}
