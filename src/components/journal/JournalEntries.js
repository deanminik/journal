import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';


export const JournalEntries = () => {

    // const entries = [1,2,3,4,5];
    const { notes } = useSelector(state => state.notes);

    // console.log(notes);// vemos la lmista de notas 


    return (
        <div className="journal_entries">

            {
                notes.map(note => (
                    <JournalEntry
                        key={note.id}
                        {...note}

                    />
                ))
            }

        </div>


    )
}

// estraemos cada una de las propiedades que tengan los notes usando el operador spread {...notes}
