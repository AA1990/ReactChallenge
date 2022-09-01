import { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ReservationsPage,
  TableBox,
  TitleWrapper
} from './Reservations.styled'
import {
  Title,
} from 'Components'
import { logo } from 'Assets/images'
import {
  listReservations,
} from 'API/reservations'

function Reservations() {
  const [reservationRows, setReservationRows] = useState([])

  const refreshReservations = async () => {
    const reservations = await listReservations()
    if (reservations?.statusCode === 200) {
      setReservationRows(reservations.data || [])
    }
  }

  useEffect(() => {
    refreshReservations()
  }, [])

  const formatDate = (date) => {
    return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`
  }

  return (
    <ReservationsPage column>

      <TitleWrapper>
        <img src={logo} alt='logo' className='logo'/>
        <Title size='m'>Bike Reservations</Title>
      </TitleWrapper>

      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>List of all registered reservations</caption>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Bike ID</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservationRows?.map((row) => (
              <TableRow key={`${row.email}_${row.bikeId}`}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.user_id}</TableCell>
                <TableCell align="center">{row.bici_id}</TableCell>
                <TableCell align="center">{formatDate(row.from_date)}</TableCell>
                <TableCell align="center">{formatDate(row.to_date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </ReservationsPage>
  );
}

export default Reservations;
