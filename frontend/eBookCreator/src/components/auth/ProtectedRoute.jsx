import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';


const ProtectedRoute = ({children}) => {

  const {isAuthenticated, loading} = useAuth(); // Assuming you have a custom hook for auth
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