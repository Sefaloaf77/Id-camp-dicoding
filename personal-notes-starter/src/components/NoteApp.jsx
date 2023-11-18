import React, { useEffect, useState } from "react";
import NoteHeader from "./NoteHeader";
import NoteBody from "./NoteBody";
import { getInitialData } from "../utils";

export default function NoteApp() {
  const [notes, setNotes] = useState(getInitialData());
  const [search, setSearch] = useState("");

  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  // console.log(search)

  return (
    <div>
      <NoteHeader onSearchChangeHandler={onSearchChangeHandler} search={search} />
      <NoteBody notes={notes} search={search} />
    </div>
  );
}
