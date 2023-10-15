import React from 'react'

export default function ToDo({ id, text, edit, save, remove, onChange }) {
  
  return (
    <div className="ToDo">
      <textarea id={id}
        className='toDoTextField'
        defaultValue={text}
        onChange={onChange}
        disabled
      />
      <button className="button editButton" onClick={() => { edit(id) }}>Edit</button>
      <button className="button saveButton" onClick={() => { save(id) }}>Save</button>
      <button className="button removeButton" onClick={() => { remove(id) }}>Remove</button>
    </div>
  )
}
