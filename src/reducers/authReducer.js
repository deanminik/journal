//este va ahcer un reducer comun y corriente 
// buscamos que el state esté vacio cunado yo no esté aneticado 
// cuando esté atenticado tendré en mi estado el nombre y todo atributo necesario
// las acciones la vamos a menajer comn u swith 
//uid va hacer el identificador que nos de firebase


import { types } from "../types/types";

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return{
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        
        case types.logout:
            //reestablesco mi objeto a un objeto vacio
            return{

            }    

        default:
            return state;
    }
}

