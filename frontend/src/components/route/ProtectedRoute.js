import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'
const ProtectedRoute = ({ children }) => {
    console.log(children,"btao")
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    return (
        <>
            {!loading && (
                     isAuthenticated ? children : <Navigate to="/login" />
            )}
        </>
    )
}

export default ProtectedRoute