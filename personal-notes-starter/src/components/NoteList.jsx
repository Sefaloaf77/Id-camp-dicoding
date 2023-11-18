import React from "react";
import NoteItem from "./NoteItem";

export default function NoteList({ notes, handleDeleteNote, search }) {
  return (
    <div>
      <h2>Catatan Aktif</h2>
      <div className="notes-list">
        {notes
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search);
          })
          .map((item) => (
            <NoteItem
              key={item.id}
              id={item.id}
              title={item.title}
              body={item.body}
              createdAt={item.createdAt}
              archived={item.archived}
              handleDeleteNote={handleDeleteNote}
            />
          ))}
      </div>
    </div>
  );
}
