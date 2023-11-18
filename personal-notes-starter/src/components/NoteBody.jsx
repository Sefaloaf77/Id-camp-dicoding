import React, { useState } from "react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import { showFormattedDate } from "../utils";

export default function NoteBody({ notes, search }) {
  const [notesList, setNotesList] = useState(notes);
  const handleAddNote = ({ title, body }) => {
    setNotesList((prevState) => [
      ...prevState,
      {
        id: +new Date(),
        title,
        body,
        createdAt: showFormattedDate(new Date()),
        archived: false,
      },
    ]);
  };

  const handleDeleteNote = (id) => {
    const newNotes = notesList.filter((note) => note.id !== id);
    setNotesList(newNotes);
  };
  return (
    <div className="note-app__body">
      <NoteInput handleAddNote={handleAddNote} />
      <NoteList notes={notesList} handleDeleteNote={handleDeleteNote} search={search} />
    </div>
  );
}
