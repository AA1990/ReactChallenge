import styled from 'styled-components'
import {
  Page,
  Section,
} from 'Components/Layout'
import { styleConstants } from 'Config'

const BikesPage = styled(Page)`
  align-items: flex-start;  
  justify-content: flex-start;
  padding-bottom: 50px;

  .logo{
    height: 50px;
    padding: 1vh;
    width: auto;
  } 
  .table-container {
    background-color: ${styleConstants.colors.greyscale300};
    width: fit-content;
  }
  .title {
    color: ${styleConstants.colors.greyscale300};
  }
`

const TitleWrapper = styled(Section)`
  align-items: flex-start;
  flex: 0;
  justify-content: flex-start;
  width: 100%;
`

const FiltersArea = styled(Section)`
  flex: 0;
  gap: 10px;
  margin-bottom: 16px;
  .MuiTextField-root .MuiFilledInput-root {
    background-color: ${styleConstants.colors.greyscale100};
  }
  .MuiTextField-root {
    label {
      color: ${styleConstants.colors.greyscale600};
    }
  }
`

const DateRangeSelectors = styled(Section)`
  flex: 0;
  gap: 10px;
  margin-top: 10px;
  .text-field {
    label {
      color: ${styleConstants.colors.greyscale200};
    }
    input {
      color: ${styleConstants.colors.greyscale300};
    }
  }
  
`

export {
  BikesPage,
  DateRangeSelectors,
  FiltersArea,
  TitleWrapper,
}
