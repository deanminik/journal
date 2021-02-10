import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route{...rest}
            component={(props) => (
                // si está autehn.. entonces el objetivo no es una no es una ruta publica
                (isAuthenticated)
                    ? (<Redirect to="/" />)
                    //caso contrario si quiere acceder a una publica lo dejo pasar 
                    : (<Component{...props} />)

            )}


        />
    )
}

// lo obligamos
PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired

}