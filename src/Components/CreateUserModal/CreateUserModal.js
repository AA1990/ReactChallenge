import { useState } from 'react';
import {
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import {
  ModalBody,
  StyledCreateUserModal,
} from './CreateUserModal.styled'
import {
  Section,
  Title,
} from 'Components'

function CreateUserModal(props) {
  const {
    defaultFromDate,
    defaultToDate,
    handleClose,
    newUser,
    ...rest
  } = props
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [isManager, setIsManager] = useState(false)
  const changeEmail = (e) => setEmail(e.target.value)
  const changePassword = (e) => setPassword(e.target.value)

  return (
    <StyledCreateUserModal     
      className='create-user-modal'
      {...rest}
    >
      <ModalBody>
        <Title>Create User</Title>
        <Section className="pickers-section">
          <TextField
            className='text-field'
            label="Email"
            variant="outlined"
            value={email} 
            onChange={changeEmail}
            size="small"
          />
          <TextField
            className='text-field'
            label="Password"
            variant="outlined"
            value={password} 
            onChange={changePassword}
            size="small"
          />
          <FormGroup>
            <FormControlLabel control={<Switch checked={isManager} onChange={() => setIsManager(!isManager)} />} label="Manager" />
          </FormGroup>
        </Section>
        <Section centered className="submit-btns">
          <Button color='error' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={() => newUser(email, password, isManager)}>
            Create
          </Button>
        </Section>
      </ModalBody>
    </StyledCreateUserModal>
  );
}

export default CreateUserModal;
