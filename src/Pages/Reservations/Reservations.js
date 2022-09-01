import { useState, useEffect, useContext } from 'react';
import {
  Button,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ReservationsPage,
  TitleWrapper
} from './Reservations.styled'
import {
  Title,
} from 'Components'
import { UserContext } from 'Context'
import {
  logo,
} from 'Assets/images'
import {
  getReservationsByUser,
  cancelReservation,
} from 'API/reservations'
import {
  rateBike,
} from 'API/bikes'

function Reservations(props) {
  const { userContext } = useContext(UserContext.Context);
  const [reservationRows, setReservationRows] = useState([])

  const refreshReservations = async () => {
    const reservations = await getReservationsByUser(userContext.id)
    if (reservations?.statusCode === 200) {
      setReservationRows(reservations.data || [])
    }
  }
  
  useEffect(() => {
    refreshReservations()
  }, [])

  const cancelBooking = async (bookingId) => {
    const cancelResult = await cancelReservation(bookingId)
    if (cancelResult?.statusCode === 204) {
      alert("Canceled")
      refreshReservations()
    } else {
      alert("Please try again later!")
    }
  }

  const rate = async (bookingId, e) => {
    const rateResult = await rateBike(bookingId, e.target.value)
    if (rateResult?.statusCode === 200) {
      alert("Rating received!")
      refreshReservations()
    } else {
      alert("Please try again later!")
    }
  }

  const formatDate = (date) => {
    return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`
  }

  return (
    <ReservationsPage column>

      <TitleWrapper>
        <img src={logo} alt='logo' className='logo'/>
        <Title size='m'>My reservations</Title>
      </TitleWrapper>

      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>List of my reservations</caption>
          <TableHead>
            <TableRow>
              <TableCell>Bike ID</TableCell>
              <TableCell align="center">Date from</TableCell>
              <TableCell align="center">Date to</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservationRows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.bici_id}
                </TableCell>
                <TableCell align="center">{ formatDate(row.from_date) }</TableCell>
                <TableCell align="center">{ formatDate(row.to_date) }</TableCell>
                <TableCell align="center">
                  <Rating name="read-only" value={row.ranking} size="small" onChange={(e) => rate(row.id, e)} readOnly={row.ranking !== null}/>
                </TableCell>
                <TableCell align="right">
                  <Button color="error" variant='outlined' onClick={() => cancelBooking(row.id)}>
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </ReservationsPage>
  )
}

export default Reservations;
