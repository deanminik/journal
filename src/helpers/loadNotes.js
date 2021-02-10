import { db } from "../firebase/firebase-config"


export const loadNotes = async (uid) =>{

   const notesSnap = await db.collection(`${uid}/journal/notes`).get();//get sirve para obtener la info de mi coleccion en firebase de ese usurio 
   const notes =[];

   notesSnap.forEach(snapHijo =>{
    //    console.log(snapHijo.data());

    notes.push({
        id:snapHijo.id,
        ...snapHijo.data()
    })
   });
   return notes;

//    console.log(notesSnap);
// console.log(notes);
}