import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useParams } from 'react-router-dom'
import {
  UserReservationsPage,
  TitleWrapper
} from './UserReservations.styled'
import {
  Title,
} from 'Components'
import { logo } from 'Assets/images'
import {
  getReservationsByUser,
} from 'API/reservations'

function UserReservations() {
  const { user } = useParams();
  const [reservationRows, setReservationRows] = useState([])

  const refreshReservations = async () => {
    const reservations = await getReservationsByUser(user)
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
    <UserReservationsPage column>

      <TitleWrapper>
        <img src={logo} alt='logo' className='logo'/>
        <Title size='m'>User Reservations</Title>
      </TitleWrapper>

      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>List of all registered UserReservations</caption>
          <TableHead>
            <TableRow>
              <TableCell>Bike ID</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservationRows?.map((row) => (
              <TableRow key={`${row.email}_${row.bikeId}`}>
                <TableCell component="th" scope="row">
                  {row.bici_id}
                </TableCell>
                <TableCell align="center">{formatDate(row.from_date)}</TableCell>
                <TableCell align="center">{formatDate(row.to_date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </UserReservationsPage>
  );
}

export default UserReservations;
