import { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Modal,
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
  BikesPage,
  TitleWrapper
} from './Bikes.styled'
import {
  CreateBikeModal,
  EditBikeModal,
  Title,
} from 'Components'
import { logo } from 'Assets/images'
import {
  createBike,
  deleteBike,
  editBike,
  getBikes,
} from 'API/bikes'

function Bikes() {
  const [selectedBike, setSelectedBike] = useState({});
  const [bikeRows, setBikeRows] = useState([]);
  const [bikeModalOpen, setBikeModalOpen] = useState(false);
  const [editBikeModalOpen, setEditBikeModalOpen] = useState(false);
  const handleOpen = () => setBikeModalOpen(true)
  const handleClose = () => setBikeModalOpen(false)

  const handleEditOpen = (bike) => {
    setSelectedBike(bike)
    setEditBikeModalOpen(true)
  };
  const handleEditClose = () => setEditBikeModalOpen(false);
  
  const refreshBikes = async () => {
    const result = await getBikes()
    if (result?.statusCode === 200) {
      setBikeRows(result.data)
    }
  }

  useEffect(() => {
    refreshBikes() 
  }, [])

  const deleteBikeById = async (id) => {
    const result = await deleteBike(id)
    if (result?.statusCode === 204) {
      refreshBikes()
      alert("Bike deleted")
    } else {
      alert("Try again later!")
    }
  }

  const addBike = async (model, color, location, enabled) => {
    const result = await createBike(model, color, location, enabled)
    if (result?.statusCode === 201) {
      alert("Bike created")
      handleClose()
      refreshBikes()
    } else {
      alert("Try again later!")
    }
  }

  const updateBike = async (id, model, color, location, enabled) => {
    const result = await editBike(id, model, color, location, enabled)
    if (result?.statusCode === 200) {
      alert("Bike updated")
      handleEditClose()
      refreshBikes()
    } else {
      alert("Try again later!")
    }
  }

  return (
    <BikesPage column>

      {/* Modals */}
      <Modal open={bikeModalOpen} >
        <CreateBikeModal
          createBike={addBike}
          handleClose={handleClose}
        />
      </Modal>
      <Modal open={editBikeModalOpen} >
        <EditBikeModal
          handleClose={handleEditClose}
          updateBike={updateBike}
          id={selectedBike.id}
          model={selectedBike.model}
          color={selectedBike.color}
          location={selectedBike.location}
          enabled={selectedBike.enable}
        />
      </Modal>

      <TitleWrapper>
        <img src={logo} alt='logo' className='logo'/>
        <Title size='m'>Bikes Admin</Title>
      </TitleWrapper>
      
      <Button variant='contained' onClick={handleOpen}>
        Add a new bike
      </Button>

      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>List of all registered bikes</caption>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Model</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell align="center">Enabled</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bikeRows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.model}</TableCell>
                <TableCell align="center">{row.color}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="center">
                  <Rating name="read-only" value={row.ranking} size="small" readOnly />
                </TableCell>
                <TableCell align="center">
                  <Checkbox checked={row.enable} size="small" readOnly />
                </TableCell>
                <TableCell align="right">
                  <Button variant='outlined' color="error" onClick={() => deleteBikeById(row.id)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant='outlined' onClick={() => handleEditOpen(row)}>
                    Edit
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
