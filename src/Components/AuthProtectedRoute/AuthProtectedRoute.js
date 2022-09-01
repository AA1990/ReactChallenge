import React from 'react'
import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({ isAuthenticated, customTarget, children, role }) => {
  if (role && role==="user") {
    return <Navigate to="/bikes" replace />
  }
  if (!isAuthenticated) {
    if (!customTarget) {
      return <Navigate to="/login" replace />
    } else {
      return children
    }
  }

  if (isAuthenticated && customTarget) {
    return <Navigate to={customTarget} replace />
  }

  return children
}

export default AuthProtectedRoute