import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date);
    // console.log(noteDate);

    // console.log(id, date, title, body, url);

    const dispatch = useDispatch();

    //vamos hacer eñ dispatch de la accion 

    const handleEntryClick = () => {
        //si le dan click en el redux la extension de crome pueden ver que el estado pasa a activo al darle click 
        dispatch(
            activeNote(id, {
                date, title, body, url
            })

        );
    }
    return (
        <div className="journal_entry pointer"
            onClick={handleEntryClick}>
            {
                // viene condicion 
                // si el url existe en tonces && muestre el div 
                url &&
                <div
                    className="journal_entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        // backgroundImage: 'url(https://loadedlandscapes.com/wp-content/uploads/2019/07/lighting-1280x720.jpg)'
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }
            <div className="journal_entry-body">
                <p className="journal_entry-title">
                    {title}
                </p>
                <p className="journal_entry-content">
                    {body}
                </p>

            </div>
            <div className="journal_entry-date-box">
                <spa>{noteDate.format('dddd')}</spa>
                <h4>{noteDate.format('Do')}</h4>

            </div>
        </div>
    )
}
