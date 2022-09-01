import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import {
  UserContext,
} from 'Context'
import {
  Bikes,
  Home,
  Login,
  Register,
  Reservations,
} from 'Pages'
import {
  Bikes as BikesManager,
  Reservations as ReservationsList,
  UserReservations as UserReservationsList,
  Users as UsersManager,
} from 'Pages/Admin'
import {
  AuthProtectedRoute,
  Navigation,
  Section,
} from 'Components'

const navigationPages = [
  '/bikes',
  '/reservations',
  '/admin/reservations',
  '/admin/bikes',
  '/admin/users',
]

const AppRoutes = (props) => {
  const [userContext, setUserContext] = useState(UserContext.InitialState);
  const location = useLocation()

  return (
    <Section id="app-routes-wrapper" {...props}>
      <UserContext.Context.Provider value={{ userContext, setUserContext }}>

        {/* NAVIGATION SIDEBAR */}
        {(navigationPages.indexOf(location.pathname) >= 0 ||
          location.pathname.indexOf('/admin/reservations') >= 0) &&
          <Navigation />
        }

        {/* ROUTES */}
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* LOGIN CUSTOM LOGIC */}
          <Route path="/login" element={
            <AuthProtectedRoute
              isAuthenticated={userContext.isAuthenticated}
              customTarget="/bikes">
                <Login />
            </AuthProtectedRoute>
          } />

          <Route path="/register" element={
            <AuthProtectedRoute
              isAuthenticated={userContext.isAuthenticated}
              customTarget="/bikes">
                <Register />
            </AuthProtectedRoute>
          } />

          {/* AUTH REQUIRED ROUTES */}
          <Route path="/bikes" element={
            <AuthProtectedRoute isAuthenticated={userContext.isAuthenticated}>
              <Bikes />
            </AuthProtectedRoute>
          } />

          <Route path="/reservations" element={
            <AuthProtectedRoute isAuthenticated={userContext.isAuthenticated}>
              <Reservations />
            </AuthProtectedRoute>
          } />

          {/* MANAGER ONLY ROUTES */}
          <Route path="/admin/bikes" element={
            <AuthProtectedRoute
              isAuthenticated={userContext.isAuthenticated}
              role={userContext.role}
            >
              <BikesManager />
            </AuthProtectedRoute>
          } />

          <Route path="/admin/users" element={
            <AuthProtectedRoute
              isAuthenticated={userContext.isAuthenticated}
              role={userContext.role}
            >
              <UsersManager />
            </AuthProtectedRoute>
          } />

          <Route path="/admin/reservations" element={
            <AuthProtectedRoute
              isAuthenticated={userContext.isAuthenticated}
              role={userContext.role}
            >
              <ReservationsList />
            </AuthProtectedRoute>
          } />

          <Route path="/admin/reservations/:user" element={
            <AuthProtectedRoute
              isAuthenticated={userContext.isAuthenticated}
              role={userContext.role}
            >
              <UserReservationsList />
            </AuthProtectedRoute>
          } />

        </Routes>

      </UserContext.Context.Provider>
    </Section>
  );
}

export default AppRoutes;
