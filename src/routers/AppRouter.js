import React, { useEffect, useState } from 'react'
import { firebase } from '../firebase/firebase-config';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
// import { loadNotes } from '../helpers/loadNotes';
import { startLoadingNotes } from '../actions/notes';



export const AppRouter = () => {

    const dispatch = useDispatch();

    //si esta autenticado va aa teber el uid 
    const [checking, setchecking] = useState(true); //miestras esto sea true no voy a mostrar nada de la aplicacion 
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged(async(user) => {
            //si el user uid existe significa que estoy atebticado
            //? significa qu pregunta si el objeto user tiene algo y lo evalua con el uid  
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                // está autenticado si = true
                setisLoggedIn(true);

            //    const notes = await loadNotes(user.uid);//ocupamos almacenar esto en mi store 
               dispatch(startLoadingNotes(user.uid)); // ya con esto queda guardado en el store 


            }else{
                //caso contrario false
                setisLoggedIn(false);
            }

            setchecking(false);//aqui terminé el checkeo 
        });

    }, [dispatch, setchecking])//dependencias


    if (checking) {
        //si checking está en true
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <switch>
                    {/* viene nustra primera ruta y no tiene que ser exacto y este es el compoenete que me  va a traer component={AuthRouter} */}
                    {/* será nuestra ruta publica */}
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />
                    
                    {/* la siguiente ruta si la ocupamos exacta  */}
                    {/* sera nuestra ruta privada */}
                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={JournalScreen}
                    />
                    {/* <Redirect to="/auth/login" />  */}

                </switch>
            </div>
        </Router>
    )
}
