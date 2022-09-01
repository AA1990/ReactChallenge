import { useState, useEffect, useContext } from 'react';
import {
  Button,
  Modal,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  BikesPage,
  DateRangeSelectors,
  FiltersArea,
  TitleWrapper,
} from './Bikes.styled'
import {
  BookingModal,
  Title,
} from 'Components'
import { UserContext } from 'Context'
import {
  logo,
} from 'Assets/images'
import {
  getAvailableBikes,
} from 'API/bikes'
import {
  createReservation,
} from 'API/reservations'

function Bikes() {
  const { userContext } = useContext(UserContext.Context);
  const [bikeRows, setBikeRows] = useState([])
  const [currentBikeId, setCurrentBikeId] = useState(undefined)
  const [dateFrom, setDateFrom] = useState(new Date())
  const [dateTo, setDateTo] = useState(new Date().setDate((new Date()).getDate() + 1))
  const [modelFilter, setModelFilter] = useState('')
  const [colorFilter, setColorFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState(undefined)
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleClose = () => setBookingModalOpen(false);
  const handleOpen = (id) => {
    setCurrentBikeId(id)
    setBookingModalOpen(true)
  };

  const refreshBikes = async () => {
    const bikes = await getAvailableBikes(new Date(dateFrom), new Date(dateTo))
    if (bikes.statusCode === 200) {
      setBikeRows(bikes.data || [])
    }
  }

  useEffect(() => {
    refreshBikes()
  }, [dateFrom, dateTo])

  useEffect(() => {
    refreshBikes()
  }, [])

  const newReservation = async (user, bike, from, to) => {
    const result = await createReservation(user, bike, from, to)
    if (result?.statusCode === 201) {
      alert("Booked!")
      handleClose()
      refreshBikes()
    } else {
      alert("Try again later!")
    }
  }

  const bikeFilter = (bike) => {
    let result = true
    result = result && bike.model.indexOf(modelFilter) >= 0
    result = result && bike.color.indexOf(colorFilter) >= 0
    result = result && bike.location.indexOf(locationFilter) >= 0
    if (ratingFilter) {
      result = result && Math.round(bike.ranking) === parseInt(ratingFilter)
    }
    return result
  }

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value.replace(/[^1-5]/g, "").slice(-1))
  }

  return (
    <BikesPage column>

      {/* Modal */}
      <Modal
        open={bookingModalOpen}
      >
        <BookingModal
          defaultFromDate={dateFrom}
          defaultToDate={dateTo}
          handleClose={handleClose}
          newReservation={newReservation}
          bike={currentBikeId}
          userEmail={userContext.email}
          userId={userContext.id}
        />
      </Modal>

      {/* Title */}
      <TitleWrapper>
        <img src={logo} alt='logo' className='logo'/>
        <Title size='m'>Available bikes</Title>
      </TitleWrapper>

      {/* Date pickers */}
      <DateRangeSelectors>
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
      </DateRangeSelectors>

      {/* Filters */}
      <Title>Filters</Title>
      <FiltersArea>
        <TextField
          className='text-field'
          label="Model"
          onChange={(e) => setModelFilter(e.target.value)}
          size="small"
          value={modelFilter}
          variant="filled"
        />
        <TextField
          className='text-field'
          label="Color"
          onChange={(e) => setColorFilter(e.target.value)}
          size="small"
          value={colorFilter}
          variant="filled"
        />
        <TextField
          className='text-field'
          label="Location"
          onChange={(e) => setLocationFilter(e.target.value)}
          size="small"
          value={locationFilter}
          variant="filled"
        />
        <TextField
          className='text-field'
          label="Rating (1-5)"
          onChange={handleRatingChange}
          size="small"
          value={ratingFilter}
          variant="filled"
        />
      </FiltersArea>

      {/* Table */}
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>List of available bikes</caption>
          <TableHead>
            <TableRow>
              <TableCell>Model</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bikeRows?.filter((bike) => bikeFilter(bike)).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.model}
                </TableCell>
                <TableCell align="center">{row.color}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">
                  <Rating name="read-only" value={row.ranking} size="small" readOnly />
                </TableCell>
                <TableCell align="right">
                  <Button variant='contained' onClick={() => handleOpen(row.id)}>
                    Book
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

    </BikesPage>
  );
}

export default Bikes;
