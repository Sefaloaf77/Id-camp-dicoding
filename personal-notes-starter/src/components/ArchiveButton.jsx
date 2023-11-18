import React from "react";

export default function ArchiveButton({archived}){
    return <button className="note-item__archive-button">{archived==true ? 'Pindahkan' : 'Arsipkan'}</button>;
}