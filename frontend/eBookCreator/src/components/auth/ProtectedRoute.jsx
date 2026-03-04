import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
  // Here you would typically check if the user is authenticated
  const isAuthenticated = true; // Replace with actual authentication logic
  const loading = false; // Replace with actual loading state
  const location = useLocation(); 

  if(loading) {
    // You can return a loading spinner or placeholder here
    return <div>Loading...</div>;
  }

  if(!isAuthenticated) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
}
export default ProtectedRoute