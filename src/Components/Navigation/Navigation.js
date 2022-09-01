import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { StyledNavigation } from './Navigation.styled'
import { UserContext } from 'Context'

function Navigation() {
  const { userContext } = useContext(UserContext.Context);
  return (
    <StyledNavigation
      className='navigation'
      column
    >
      <Link to="/bikes">Bikes</Link>
      <Link to="/reservations">My reservations</Link>
      {userContext.role === "manager" && (
        <>
          <hr></hr>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/bikes">Bikes</Link>
          <Link to="/admin/reservations">Bookings</Link>
        </>
      )}
    </StyledNavigation>
  );
}

export default Navigation;