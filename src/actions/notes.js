import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from '../types/types';

export const startNewNote = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        //  console.log(getState());

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        // console.log(doc);

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));

    }
}

//esta esmi segunda accion para madalarla al reducer 
//tambien hay que poner esto en el notereducer, añadiendolo en un nuevo case  
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id,note) =>({
    type: types.notesAddNew,
    payload:{
        id, ...note
    }
})

export const startLoadingNotes = (uid) => {

    //esta va ahcer una función que va a disparar otra
    // va hacer asincrona por lo cual ocupo thunk 
    return async (dispatch) => {
        const notes = await loadNotes(uid);//aqui es donde cargo las notas en base a ese uid 
        dispatch(setNote(notes));
    }
}



//otra accion 
export const setNote = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

//luego hay que enviarla al reducer 


//crearemos la aciton para guardar ña nota que cambio en la base de datos
export const startSaveNote = (note) => {
    //esto será una tarea asincrono por lo tanto trabajaremos con el middle ware y se disparará gracias a thunk
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        //verificamos primero la nota ya viene con id y en firestore no vamos agrabar un nuevo id
        //si no viene el url 
        if (!note.url) {
            delete note.url; // borramos la url porque no lo soporta si está vacio undefine
        }
        const noteToFirestore = { ...note };//usamos el spread para separar toda la nota y hacer un clon 
        delete noteToFirestore.id; // de esta forma elimnamos la propiedad id del objeto note  

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        // dispatch(startLoadingNotes(uid));// si hacemos esto todas las notas se cargan lo cual no es recomendable 
        dispatch(refreshNotes(note.id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');

    }

}

//vamos acrear una accion solo para el que se actalizó 

export const refreshNotes = (id, note) => ({
    type: types.notesUpdated,// hay que pasarlo al notereducer tambien 
    // el payload que vamos a mandar es la nota que queremos actualizar
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }

})



export const startUploading = (file) => {
    // file va ahcer el archivo que quiero subir y como es una tare asincrona voy a ocupar thunk 
    return async (dispatch, getState) => {

        const { active: activeNote } = getState().notes;
        //mensaje
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowEscapeKey: false,
            showCancelButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })


        const fileUrl = await fileUpload(file)
        // console.log(fileUrl);
        // console.log(activeNote)
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote))
        //quitamos el loading
        Swal.close();// se cierra la ventana
    }

}

export const startDeleting = (id) =>{

    return async(dispatch, getState) =>{
        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        //vamos ahra a borrarlo del store
        dispatch(deleteNote(id));// metemos la aqccion 
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})


export const noteLogout = () =>({
    type: types.notesLogoutCleaning
})
// //tarea asincrona

        // return async(dispatch, getState) =>{
        //     //grabarenos en firestore

        //     const {uid} = getState().auth;
        //     // console.log(getState());

        //     const newNote = {
        //         title:'',
        //         body:'',
        //         date: new Date().getTime()
        //     }

        //     // para pasrle esa ifnormacion a frestroe ocupamos la referencia
        //     const doc = await db.collection(`${uid}/journal/notes`).add(newNote);// este va hacer un promesa 

        //     console.log(doc);  
        //     // grabarenos en firestore