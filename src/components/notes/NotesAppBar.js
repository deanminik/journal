import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        //  console.log(active)
        dispatch(startSaveNote(active))

    }

    const handlePictureClick = () => {
        // console.log('picture')
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        // console.log(e.target.files);
        const file = e.target.files[0];
        if(file){
            dispatch(startUploading(file));
        }
    }

    return (
        <div className="notes_appbar">
            <span>
                28 de agosto 2020
            </span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}// lo usaremos para saber cuandop cambia y si cambia disparo una funcion 
                onChange={handleFileChange}

            />

            <div>
                <button
                    className="btn"
                    onClick={handlePictureClick}
                >Picture
                </button>

                <button className="btn"
                    onClick={handleSave}
                >Save</button>
            </div>
        </div>
    )
}
