import styled from 'styled-components'
import {
  Page,
  Section,
} from 'Components/Layout'
import { styleConstants } from 'Config'

const UserReservationsPage = styled(Page)`
  align-items: flex-start;  
  justify-content: flex-start;

  .logo{
    height: 50px;
    padding: 1vh;
    width: auto;
  } 
  .table-container {
    background-color: ${styleConstants.colors.greyscale300};
    margin-top: 15px;
    width: fit-content;
  }
`

const TitleWrapper = styled(Section)`
  align-items: flex-start;
  flex: 0;
  justify-content: flex-start;
  width: 100%;

  .title {
    color: ${styleConstants.colors.greyscale300};
  }
`

export {
  UserReservationsPage,
  TitleWrapper,
}
