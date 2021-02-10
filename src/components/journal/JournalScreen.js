import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes);//estarer informacion del store 



    return (
        <div className="journal_main-content">
            <Sidebar />

            <main>
                {
                    //condicional 
                    (active)//si tiene algo entonces
                        ? (<NoteScreen />)//lo muestra
                        : (<NothingSelected />)//sino lo tiene no lo muestra 
                }


            </main>
        </div>
    )
}
