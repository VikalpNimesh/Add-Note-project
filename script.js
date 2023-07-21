const addbtn = document.querySelector("#addbtn");
const main = document.querySelector("#main");

const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes);
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
    if (data.length === 0) {
      localStorage.removeItem("notes");
    }
  });
  localStorage.setItem("notes", JSON.stringify(data));
};

addbtn.addEventListener("click", function () {
  addNote();
});
const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div id="tool">
    <i class="save fas fa-save"></i>
    <i class="trash fas fa-trash"></i>
</div>
<textarea >${text}</textarea>


`;

  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });
  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });

  main.appendChild(note);
};

(function () {
  const lsnotes = JSON.parse(localStorage.getItem("notes"));
  if (lsnotes === null) {
    addNote();
  } else {
    lsnotes.forEach((lsnotes) => {
      addNote(lsnotes);
    });
  }

  if (lsnotes.length === 0) {
    localStorage.removeItem("notes");
  } else {
    addNote();
  }
})();
