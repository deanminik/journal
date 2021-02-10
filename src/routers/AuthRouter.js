// este tendrá todas las páginas relacionadas al auth 

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';


export const AuthRouter = () => {
    return (
        <div className="auth_main">
            <div className="auth_box-container">
                <Switch>
                    <Route
                        exact
                        path="/auth/login"
                        component={LoginScreen}
                    />

                    <Route
                        exact
                        path="/auth/register"
                        component={RegisterScreen}
                    />

                    {/* si no va para ninguna de esas rutas entonces que haga un redirectc  */}
                    {/* los nombres despues del auth no impoortan pero tiene que ser diferentes a los otros */}

                    {/* <Redirect to="/auth/login" /> */}
                </Switch>
            </div>

        </div>
    )
}
