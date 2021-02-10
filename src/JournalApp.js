import React from 'react'
import { Provider } from 'react-redux';
// provider será para que nos provee la informacion con el store 

import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

import './styles/styles.scss';



export const JournalApp = () => {

    return (
        <Provider store={store}>

            <AppRouter />

        </Provider>

    )
}
