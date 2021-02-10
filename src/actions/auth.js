
// //esta es una accion 


// import { types } from '../types/types';

// //esta funcion nos regresará un callback
// export const startLoginEmailPassword = ( email, password) =>{
// //     cuando entra usa el dispatch dispatch(login(123, 'Pedro')); que esjecuta esta accion:
// //_____________________________________________________
// // export const login = (uid, displayName) =>({

// //     type: types.login,
// //     payload:{
// //         uid,
// //         displayName
// //     }
// // }):___________________________________________
// // que va aplicar directamente en el store- esto modifical el state y regresa todo lo que estamos esperando  
//     return (dispatch)=>{ // ese dispatch nos lo ofrece thuk por nosotros 

//         setTimeout(() => {
//             //haré un dispatch del login 
//             dispatch(login(123, 'Pedro'));
//         }, 3500);
//     }
// }

// // export const login = (uid, displayName) =>{
// //     return{
// //         type: types.login,
// //         payload:{
// //             uid,
// //             displayName
// //         }
// //     }
// // }


// // la forma corta es la siguiente, y hace lo mismo solo que no hay que añadirle reutnr y va entre parentesis 

// export const login = (uid, displayName) =>({

//         type: types.login,
//         payload:{
//             uid,
//             displayName
//         }
//     })

//________________________________________________________________________________________________________
//lo anterios tienen comentarios 
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

//esta es una accion 
export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {


        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
                dispatch(finishLoading());
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })



        // return (dispatch) => {

        //     setTimeout(() => {

        //         dispatch(login(123, 'Pedro'));
        //     }, 3500);
        // }
    }
}
// export const startGoogleLogin = () => {
//     return (dispatch) => {
//         firebase.auth().signInWithPopup(googleAuthProvider)//esto va a retornar un promesa 
//             .then(userCred => {
//                 console.log(userCred);
//             })
//     }
// }

// vamos a usar lo pero con desestructuracion 
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)//esto va a retornar un promesa 
            // vamos a usas desestructufracion     
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}


export const startRegisterWithEmailPasswordName = (email, password, name) => {

    //esta va hacer una tarea asincrona, entocnes necesitamos retornar un callback
    //en el momento que tenga registrado el usuario en firebase ahí es cuando usaré el dispacth 
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name });//ese name viene como argument de  export const startRegisterWithEmailPasswordName = (email, password, name) =>{
                console.log(user);
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })
    }

}
export const login = (uid, displayName) => ({

    type: types.login,
    payload: {
        uid,
        displayName
    }
})


export const startLogout = () =>{
    //será una accion asincrona ya que firebase dispara un promesa
    return async(dispatch) =>{
        await firebase.auth().signOut();

        // si se ejecutó de manera correcta haré el distpacth 
        dispatch(logout());
        dispatch(noteLogout());
    }
}
// asyn y await => los añadi porque quiero esperar a que eso se ejecute firebase.auth().signOut();


export const logout = () =>({
    type: types.logout
}) 