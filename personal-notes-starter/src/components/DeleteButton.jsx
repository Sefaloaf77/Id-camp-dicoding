import React from "react";

export default function DeleteButton({ id, handleDeleteNote }) {
  return (
    <button
      className="note-item__delete-button"
      onClick={() => handleDeleteNote(id)}
    >
      Delete
    </button>
  );
}
