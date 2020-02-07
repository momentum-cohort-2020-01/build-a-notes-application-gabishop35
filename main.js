function print (value) {
  console.log(value)
  return value
}

function p (selector) {
  return document.querySelector(selector)
}

const newNoteForm = document.querySelector('#new-note-form')

function getAllNotes () {
  return fetch('http://localhost:3000/notes/', {
    method: 'GET'
  })
    .then(response => response.json())
}

function createNotesHTML (notes) {
  let notesStr = '<ul id="notes-list">'
  for (const note of notes) {
    notesStr += createNoteHTML(note)
  }
  notesStr += '</ul>'
  return notesStr
}

function createNoteHTML (note) {
  return `<li class="li" data-note-id="${note.id}">${note.note} <button class="edit"> Edit </button><button class="delete"> Delete </button> <li>`
}

function postNewNote (noteText) {
  return fetch('http://localhost:3000/notes/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note: noteText, done: false, created: moment().format() })
  })
    .then(response => response.json())
}

function renderNotesList (notes) {
  const notesHTML = createNotesHTML(notes)
  const notesSection = document.querySelector('#notes')
  notesSection.innerHTML = notesHTML
}

function renderNewNote (note) {
  const noteHTML = createNoteHTML(note)
  const notesList = document.querySelector('#notes-list')
  notesList.insertAdjacentHTML('beforeend', noteHTML)
}

getAllNotes().then(renderNotesList)

newNoteForm.addEventListener('submit', event => {
  event.preventDefault()
  const noteTextField = document.querySelector('#note-text')
  const noteText = noteTextField.value
  noteTextField.value = ''
  postNewNote(noteText).then(renderNewNote)
})

p('#notes').addEventListener('click', event => {
  if (event.target.matches('.delete')) {
    print('delete ' + event.target.parentElement.dataset.noteId)
    return fetch(('http://localhost:3000/notes/' + event.target.parentElement.dataset.noteId),
      { method: 'DELETE' })
  }
})

function editPost (note) {
  return fetch(('http://localhost:3000/notes/') + (event.target.parentElement.dataset.notId), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note: noteText, done: false, created: moment().format() })
  })
    .then(response => response.json)
}

p('#notes').addEventListener('click', event => {
  if (event.target.matches('.edit')) {
    print('.edit' + event.target.parentElement.dataset.notId)
  }
})

// function deleteNote (note) {
//   return fetch('http://localhost:3000/notes/:id', {
//     method: 'DELETE'
// headers: { 'Content-Type': 'application/json' }
//   })
//     .then(response => response.json())
// }

// function deleteNote(note) {
// fetch('http://localhost:3000/notes/noteId', {
// method: 'DELETE',})
//   .then(response => response.json)
//     }
