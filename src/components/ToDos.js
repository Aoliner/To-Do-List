import React from 'react'
import { nanoid } from 'nanoid'
import {
  useState,
  useRef,
  useEffect
} from "react";
import ToDo from './ToDo';


export default function ToDos() {
  const LOCAL_TO_DOS = "localToDos"
  const newToDoInput = document.querySelector("#newToDoInput")
  const newToDo = document.querySelector(".newToDo")
  const [toDoText, setToDoText] = useState("")
  const [savedToDos, setSavedToDos] = useState([])
  const inputRef = useRef(null)
  let listOfToDos = document.querySelectorAll(".ToDo")
  let buttonElement

  useEffect(() => {
    if (localStorage.getItem(LOCAL_TO_DOS)) {
      setSavedToDos(JSON.parse(localStorage.getItem(LOCAL_TO_DOS)))
    }
  }, [])


  function handleChange(event) {
    setToDoText(event.target.value)
  }


  function unblockNotes() {
    listOfToDos = document.querySelectorAll(".ToDo")
    listOfToDos.forEach(toDo => toDo.classList.remove('blocked'))
    newToDo.classList.remove('blocked')
  }


  function addNewToDo() {
    if (toDoText) {
      const localToDo = {
        id: nanoid(),
        text: toDoText,
      }

      setSavedToDos([localToDo, ...savedToDos])
      localStorage.setItem(LOCAL_TO_DOS, JSON.stringify([localToDo, ...savedToDos]))
      setToDoText("")
      newToDoInput.value = ""
      inputRef.current.focus()
    }
  }


  function editButton(id) {
    buttonElement = document.getElementById(id).parentNode.childNodes

    buttonElement[1].style.visibility = "hidden"
    buttonElement[2].style.visibility = "visible"
    buttonElement[1].style.display = "none"
    buttonElement[2].style.display = "block"
    document.getElementById(id).removeAttribute("disabled")


    let listOfUnfocusedToDos = savedToDos.filter(todo => todo.id != id)
    listOfUnfocusedToDos.forEach(unfocusedToDo => document.getElementById(unfocusedToDo.id).parentElement.classList.add('blocked'))
    newToDo.classList.add('blocked')

  }


  function saveButton(id) {
    buttonElement = document.getElementById(id).parentNode.childNodes
    buttonElement[2].style.visibility = "hidden"
    buttonElement[1].style.visibility = "visible"
    buttonElement[2].style.display = "none"
    buttonElement[1].style.display = "block"

    if (toDoText) {
      const editedToDo = {
        id: id,
        text: toDoText
      }

      let updatedToDos = savedToDos.filter(note => note.id != id)
      localStorage.setItem(LOCAL_TO_DOS, JSON.stringify([editedToDo, ...updatedToDos]))
      setSavedToDos([editedToDo, ...updatedToDos])
      setToDoText("")
    }

    document.getElementById(id).setAttribute("disabled", "")
    unblockNotes()
  }



  function removeButton(id) {
    let deletedToDo = savedToDos.filter(note => note.id != id)
    localStorage.setItem(LOCAL_TO_DOS, JSON.stringify([...deletedToDo]))
    setSavedToDos([...deletedToDo])
    unblockNotes()
  }



  return (
    <>
      <div className='mainContent'>

        <div className="newToDo">
          <textarea
            ref={inputRef}
            id="newToDoInput"
            placeholder="New to-do"
            onChange={handleChange} />
          <button className="addButton" onClick={addNewToDo}>add</button></div>

          {savedToDos.length != 0 ? <div className="gridNotes">
          {savedToDos.map((savedToDo) => (
            <ToDo
              onChange={handleChange}
              key={savedToDo.id}
              id={savedToDo.id}
              text={savedToDo.text}
              edit={editButton}
              save={saveButton}
              remove={removeButton}
            />

          ))
          }</div> : <p>You have no tasks</p>}

      </div>
    </>
  )
}
