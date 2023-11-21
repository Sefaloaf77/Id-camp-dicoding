import React, { useState } from "react";

export default function NoteInput({ handleAddNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onTitleChangeHandler = (e) =>{
    if (e.target.value.length <= 50) {
      setTitle(e.target.value);
    } 
  }
  const remainingCharacter = 50-title.length;
  const onBodyChangeHandler = (e)=>{
    setBody(e.target.value)
  }

  const onSubmitHandler = (e)=>{
    e.preventDefault()
    handleAddNote({title, body})
  }
  

  return (
    <>
      <form className="note-input" onSubmit={onSubmitHandler}>
        <h2>Buat Catatan</h2>
        <p className="note-input__title__char-limit">
          Sisa Karakter: {remainingCharacter}
        </p>
        <input
          className="note-input__title"
          type="text"
          value={title}
          onChange={onTitleChangeHandler}
          name="title"
          placeholder="Tuliskan Judul..."
        />
        <textarea
          name="body"
          value={body}
          onChange={onBodyChangeHandler}
          className="note-input__body"
          placeholder="Tuliskan Catatan..."
        />
        <button type="submit">Buat</button>
      </form>
    </>
  );
}
