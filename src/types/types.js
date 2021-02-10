

//aqui definiremos nuestrops types que usaremos en swith en el archivo de authReducer dentro del directorio reducers para no equivocarnos 
// [auth] significa el valor al que apunta 
export const types = {

    login:'[Auth] Login',
    logout:'[Auth] Logout',


    uiSetError:'[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    notesAddNew:'[Notes] New note',
    notesActive:'[Notes] Set active note',
    notesLoad:'[Notes] Load note',
    notesUpdated:'[Notes] Updated note saved',
    notesFileUrl:'[Notes] Updated image url',
    notesDelete:'[Notes] Delete note',
    notesLogoutCleaning:'[Notes] Logout cleaning',

}

//esas serám mis tipos que serán configuradas en las acciones del reducer  
// [Notes] indic el reducer al cual reaacciona esta accion 
//
// luego de crear los tipos hay que crear la accion 