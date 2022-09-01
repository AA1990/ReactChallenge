import styled from 'styled-components'
import { Paper } from '@mui/material'
import {
  Page,
  Section,
} from 'Components/Layout'
import { styleConstants } from 'Config'

const LoginPage = styled(Page)`
  align-items: center;  
  justify-content: flex-start;

  .logo{
    height: 110px;
    padding: 3vh;
    width: auto;
  } 
`

const FormBox = styled(Paper)`
  && {
    align-items: center;
    background-color: ${styleConstants.colors.greyscale200};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    flex: 0;
    max-width: 360px;
    padding: 20px 0 40px 0;
    width: 90%;
  }

  .text-field {
    width: 100%;
  }

  .submit-btn {
    margin-bottom: 8px;
  }
`

const FormFields = styled(Section)`
  flex: 0;
  gap: 12px;
  margin: 18px 0;
  width: 80%;
`

export {
  FormBox,
  FormFields,
  LoginPage,
}
