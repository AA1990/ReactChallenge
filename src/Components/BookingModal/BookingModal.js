import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  Button,
  TextField,
} from '@mui/material';
import {
  ModalBody,
  StyledBookingModal,
} from './BookingModal.styled'
import {
  Section,
  Text,
  Title,
} from 'Components'

function BookingModal(props) {
  const {
    bike,
    defaultFromDate,
    defaultToDate,
    handleClose,
    newReservation,
    userEmail,
    userId,
    ...rest
  } = props
  const [dateFrom, setDateFrom] = useState(defaultFromDate)
  const [dateTo, setDateTo] = useState(defaultToDate)

  return (
    <StyledBookingModal     
      className='booking-modal'
      {...rest}
    >
      <ModalBody>
        <Title>Book bike</Title>
        <Text>Bike: {bike}</Text>
        <Text>User: {userEmail}</Text>
        <Section className="pickers-section">
          <DateTimePicker
            label="From"
            value={dateFrom}
            variant="filled"
            onChange={setDateFrom}
            renderInput={(params) => <TextField {...params} className="text-field" />}
          />
          <DateTimePicker
            label="To"
            value={dateTo}
            variant="filled"
            onChange={setDateTo}
            renderInput={(params) => <TextField {...params} className="text-field" />}
          />
        </Section>
        <Section centered className="submit-btns">
          <Button color='error' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={() => newReservation(userId, bike, dateFrom, dateTo)}>
            Book
          </Button>
        </Section>
      </ModalBody>
    </StyledBookingModal>
  );
}

export default BookingModal;
