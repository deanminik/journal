import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';


export const NoteScreen = () => {

    //necesitp del state los notes
    const { active: note } = useSelector(state => state.notes);
    // console.log(active)
    //active:note siver para renombrar la propiedad
    // console.log(note);

    //el useform me va a devolver lo que tengo en el []
    const [formValues, handleInputChange, reset] = useForm(note);//este va a recibir las notas activas // el use for maneja su propio estado 
    // console.log(formValues);
    //necesitamos cambiar el estado cuando cambia la nota, podriamos usar useeffect 
    //ejecutaremos esa action si el id de lanota es diferente

    const activedId = useRef(note.id); // me perimte almacer nuna variable mutable que no va a cmabiar todo el componente si cambia 
    //lo que vamos hacer es cambiar esa nota activedId  con el use select active: note o ses la que cambio

    useEffect(() => {
        // const activedId = useRef(note.id); // me perimte almacer nuna variable mutable que no va a cmabiar todo el componente si cambia 
        //lo que vamos hacer es cambiar esa nota activedId  con el use select active: note o ses la que cambio
        if (note.id !== activedId.current) {
            reset(note);
            //ahora ocupamos establecer el nuevo valor del active id 
            activedId.current = note.id
            // todo lo anterior se dispara si la nota cambiĺo para evitar ese ciclo infinito 
        }
    }, [note, reset])
    const { body, title, id } = formValues;// con podemos agregarlas en sus repsectivas cajas 

    const dispatch = useDispatch();

    useEffect(() => {

        // console.log(formValues)
        //ocupamos hacer un dispatch para cambiar la nota activa y colocamos la accion 
        dispatch(activeNote(formValues.id, { ...formValues }));

    }, [formValues, dispatch])
    //con eso la informacion de la nota cambia según lo que pongas 
    
    const handleDelete = () =>{
        dispatch(startDeleting(id));// de una tarea asincrona por lo tanto coupamo thunk 
    }

    return (
        <div className="notes_main-content">
            <NotesAppBar />

            <div className="notes_content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="note_title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happend today"
                    className="notes_textarea"
                    name="body"//sin el name no podriamos escribir en la nota 
                    value={body}
                    onChange={handleInputChange}
                >

                </textarea>
                {
                    (note.url) && (
                        <div className="notes_image">
                            <img
                                src={note.url}
                                alt="Landscape"
                            />

                        </div>)
                }

            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>


    )
}
