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
  StyledEditUserModal,
} from './EditUserModal.styled'
import {
  Section,
  Title,
} from 'Components'

function EditUserModal(props) {
  const {
    defaultFromDate,
    defaultToDate,
    handleClose,
    updateUser,
    user,
    ...rest
  } = props
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [isManager, setIsManager] = useState(user.groups.length > 0)
  const changeEmail = (e) => setEmail(e.target.value)
  const changePassword = (e) => setPassword(e.target.value)

  return (
    <StyledEditUserModal     
      className='create-user-modal'
      {...rest}
    >
      <ModalBody>
        <Title>Edit User</Title>
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
          <Button variant='contained' onClick={() => updateUser(user.id, email, password, isManager)}>
            Confirm
          </Button>
        </Section>
      </ModalBody>
    </StyledEditUserModal>
  );
}

export default EditUserModal;
