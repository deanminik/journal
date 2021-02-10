
 import { createStore,combineReducers, applyMiddleware, compose } from 'redux';
 import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

// nos habilita las extencxiones del devtool y podrmos aplicar middlewares
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//dentro se pueden meter varios reducer
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes:notesReducer

})

//solo se puede añadir un reducer 
export const store = createStore(
    reducers,
    composeEnhancers( 
        applyMiddleware(thunk)//aqui aplicamos el middle ware y mand el thunk * con esoi trabajamos con acciones asincronas
        
        )
// ,    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

   
