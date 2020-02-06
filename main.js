function print (value) {
  console.log(value)
  return value
}

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
  return `<li data-note-id="${note.id}">${note.note} <button class="delete"> Delete </button><.li>`
}
