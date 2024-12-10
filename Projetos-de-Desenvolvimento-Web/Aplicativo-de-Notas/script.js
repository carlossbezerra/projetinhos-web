const noteText = document.getElementById('note-text');
const saveNoteButton = document.getElementById('save-note');
const noteList = document.getElementById('note-list');


function saveNote() {
  const noteContent = noteText.value.trim();
  if (noteContent !== "") {
    const notes = getNotes();
    notes.push(noteContent);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    noteText.value = "";
  }
}

function getNotes(){
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// ... (seu código JavaScript anterior) ...

function displayNotes() {
    const notes = getNotes();
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${note} <button class="delete-button" data-index="${index}">Excluir</button>`;
      noteList.appendChild(listItem);
    });

    //Adiciona evento de click nos botões de exclusão
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index,10);
            if(confirm("Tem certeza que deseja excluir esta nota?")){
                deleteNote(index);
            }
        });
    });
}

function deleteNote(index){
    const notes = getNotes();
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// ... (seu código JavaScript restante) ...


saveNoteButton.addEventListener('click', saveNote);

window.addEventListener('load', displayNotes);