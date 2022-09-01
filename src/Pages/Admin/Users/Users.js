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
  UsersPage,
  TableBox,
  TitleWrapper
} from './Users.styled'
import {
  CreateUserModal,
  EditUserModal,
  PasswordInput,
  Section,
  Text,
  Title,
} from 'Components'
import { UserContext } from 'Context'
import { logo } from 'Assets/images'
import {
  createUser,
  deleteUser,
  editUser,
  getUsers,
} from 'API/user'
import { useNavigate } from 'react-router-dom';

function Users() {
  const navigation = useNavigate();
  const [selectedUser, setSelectedUser] = useState({});
  const [userRows, setUserRows] = useState([]);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userEditModalOpen, setUserEditModalOpen] = useState(false);
  const handleOpen = () => setUserModalOpen(true);
  const handleClose = () => setUserModalOpen(false);
  
  const handleEditOpen = (user) => {
    setSelectedUser(user)
    setUserEditModalOpen(true)
  };
  const handleEditClose = () => setUserEditModalOpen(false);

  const refreshUsers = async () => {
    const usersResult = await getUsers()
    if (usersResult?.statusCode === 200) {
      setUserRows(usersResult.data)
    }
  }
  useEffect(() => {
    refreshUsers()
  }, [])

  const deleteUserById = async (id) => {
    const result =  await deleteUser(id)
    if (result.statusCode === 204) {
      alert("User deleted")
      refreshUsers()
    } else {
      alert("Please try again later!")
    }
  }

  const newUser = async (email, password, isManager) => {
    const result = await createUser(email, password, isManager)
    if (result?.statusCode === 201) {
      alert("User created!")
      handleClose()
      refreshUsers()
    } else {
      alert("Please try again later!")
    }
  }

  const updateUser = async (id, email, password, isManager) => {
    const result = await editUser(id, email, password, isManager)
    if (result?.statusCode === 200) {
      alert("User updated!")
      handleEditClose()
      refreshUsers()
    } else {
      alert("Please try again later!")
    }
  }

  return (
    <UsersPage column>

      {/* Modals */}
      <Modal open={userModalOpen} >
        <CreateUserModal
          handleClose={handleClose}
          newUser={newUser}
        />
      </Modal>
      <Modal open={userEditModalOpen} >
        <EditUserModal
          handleClose={handleEditClose}
          updateUser={updateUser}
          user={selectedUser}
        />
      </Modal>

      <TitleWrapper>
        <img src={logo} alt='logo' className='logo'/>
        <Title size='m'>Users Admin</Title>
      </TitleWrapper>
      
      <Button variant='contained' onClick={handleOpen}>
        Create a new user
      </Button>

      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>List of all registered Users</caption>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Is manager</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  <Checkbox checked={row.groups?.length > 0} size="small"  />
                </TableCell>
                <TableCell align="right">
                  <Button variant='outlined' color="error" onClick={() => deleteUserById(row.id)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant='outlined' onClick={() => handleEditOpen(row)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant='outlined' color="success" onClick={() => navigation(`/admin/reservations/${row.id}`)}>
                    Bookings
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </UsersPage>
  );
}

export default Users;
