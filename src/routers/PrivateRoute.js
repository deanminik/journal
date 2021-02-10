

import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {


    // localStorage.setItem('lastPasth', rest.location.pathname); esto no lo ocupamos 
    return (
        <Route{...rest}
            component={(props) => (
                (isAuthenticated)
                    ? (<Component{...props} />)
                    : (<Redirect to="/auth/login" />)

            )}


        />
    )
}

// lo obligamos
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired

}