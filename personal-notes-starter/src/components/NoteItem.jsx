import React from "react";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";

export default function NoteItem({ id, title, body, createdAt, archived, handleDeleteNote }) {
  return (
    <div className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__date">{createdAt}</p>
        <p className="note-item__body">{body}</p>
      </div>
      <div className="note-item__action">
        <DeleteButton id={id} handleDeleteNote={handleDeleteNote} />
        <ArchiveButton archived={archived} />
      </div>
    </div>
  );
}
