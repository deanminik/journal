
//crearé un reducer 

import { types } from "../types/types";


const initialState = {
    notes: [],
    active: null
}
export const notesReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.notesActive:
            //lo que queremos es simpre regresar un nuevo estado, no mutar el anterior
            return {
                ...state,//regresa el estado anterior 
                active: {
                    ...action.payload
                }
            }
        case types.notesLoad:
            //  console.log(action.payload);
            return {
                ...state,//regresa el estado anterior para no hacer modificaciones inesesarias
                notes: [...action.payload]
            }
        case types.notesAddNew:
            return{
                ...state,
                notes:[action.payload, ...state.notes]
            }    

        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    //si son iguales significa que esa es la nota que necesito actualizar
                    note => note.id === action.payload.id
                        ? action.payload.note//devuleve ese pero caso contrario
                        : note
                )
            }
        case types.notesDelete:
            return{
                ...state,
                active: null,
                notes:state.notes.filter(note => note.id !== action.payload)
            }    
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
} 