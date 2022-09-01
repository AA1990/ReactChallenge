import React, { useState } from 'react';
import {
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';

import {
  ModalBody,
  StyledCreateBikeModal,
} from './CreateBikeModal.styled'
import {
  Section,
  Title,
} from 'Components'

function CreateBikeModal(props) {
  const {
    createBike,
    defaultFromDate,
    defaultToDate,
    handleClose,
    ...rest
  } = props
  const [model, setModel] = React.useState(undefined)
  const [color, setColor] = React.useState(undefined)
  const [location, setLocation] = React.useState(undefined)
  const [isEnabled, setIsEnabled] = useState(true)
  
  const changeEmail = (e) => setModel(e.target.value)
  const changeLocation = (e) => setLocation(e.target.value)
  const changePassword = (e) => setColor(e.target.value)
  return (
    <StyledCreateBikeModal     
      className='create-bike-modal'
      {...rest}
    >
      <ModalBody>
        <Title>Create Bike</Title>
        <Section className="pickers-section">
          <TextField
            className='text-field'
            label="Model"
            variant="outlined"
            value={model} 
            onChange={changeEmail}
            size="small"
          />
          <TextField
            className='text-field'
            label="Color"
            variant="outlined"
            value={color} 
            onChange={changePassword}
            size="small"
          />
          <TextField
            className='text-field'
            label="Location"
            variant="outlined"
            value={location} 
            onChange={changeLocation}
            size="small"
          />
          <FormGroup>
            <FormControlLabel control={<Switch checked={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />} label="Enabled" />
          </FormGroup>
        </Section>
        <Section centered className="submit-btns">
          <Button color='error' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={() => createBike(model, color, location, isEnabled)}>
            Create
          </Button>
        </Section>
      </ModalBody>
    </StyledCreateBikeModal>
  );
}

export default CreateBikeModal;
