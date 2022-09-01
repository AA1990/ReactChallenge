import { useState } from 'react'
import {
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material'
import {
  ModalBody,
  StyledEditBikeModal,
} from './EditBikeModal.styled'
import {
  Section,
  Title,
} from 'Components'

function EditBikeModal(props) {
  const {
    color,
    defaultFromDate,
    defaultToDate,
    enabled,
    handleClose,
    id,
    location,
    model,
    updateBike,
    ...rest
  } = props
  const [editModeModel, setModel] = useState(model)
  const [editModeColor, setColor] = useState(color)
  const [editModeLocation, setLocation] = useState(location)
  const [editModeIsEnabled, setEditIsEnabled] = useState(enabled)
  
  const changeEmail = (e) => setModel(e.target.value)
  const changeLocation = (e) => setLocation(e.target.value)
  const changePassword = (e) => setColor(e.target.value)
  
  return (
    <StyledEditBikeModal     
      className='create-bike-modal'
      {...rest}
    >
      <ModalBody>
        <Title>Edit Bike</Title>
        <Section className="pickers-section">
          <TextField
            className='text-field'
            label="Model"
            variant="outlined"
            value={editModeModel} 
            onChange={changeEmail}
            size="small"
          />
          <TextField
            className='text-field'
            label="Color"
            variant="outlined"
            value={editModeColor} 
            onChange={changePassword}
            size="small"
          />
          <TextField
            className='text-field'
            label="Location"
            variant="outlined"
            value={editModeLocation} 
            onChange={changeLocation}
            size="small"
          />
          <FormGroup>
            <FormControlLabel control={<Switch checked={editModeIsEnabled} onChange={() => setEditIsEnabled(!editModeIsEnabled)} />} label="Enabled" />
          </FormGroup>
        </Section>
        <Section centered className="submit-btns">
          <Button color='error' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={() => updateBike(id, editModeModel, editModeColor, editModeLocation, editModeIsEnabled)}>
            Confirm
          </Button>
        </Section>
      </ModalBody>
    </StyledEditBikeModal>
  );
}

export default EditBikeModal;
