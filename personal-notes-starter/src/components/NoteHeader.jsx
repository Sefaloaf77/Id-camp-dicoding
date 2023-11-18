import React, { useState } from "react";

export default function NoteHeader({ search, onSearchChangeHandler }) {
  return (
    <header className="note-app__header">
      <h1>Notes</h1>
      <div className="note-search">
        <input
          type="text"
          placeholder="Cari catatan..."
          onChange={onSearchChangeHandler}
        />
      </div>
    </header>
  );
}
