const fs = require("fs");
const chalk = require("chalk")

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((notes) => notes.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log("Successfully added");
  } else {
    console.log("Title exist");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((notes) => notes.title !== title)
  const noteNotExist = notes.filter((notes) => notes.title === title)

if (noteNotExist.length === 0) {
    console.log('Sorry Title Not Exist!');
} else if (notesToKeep.length !== -1) {
  saveNotes(notesToKeep);
  console.log('Succesfully Removed ' + title)
}
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log('Title '+note.title +' Body ' + note.body)
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const read = notes.find((notes) => title === notes.title)
    
    if (read) {
        console.log(chalk.inverse(read.title))
        console.log(read.body)
    } else {
        console.log(chalk.red.inverse('Cant find the note your looking for'))
        
    }
    
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes:listNotes,
  readNote:readNote
};
