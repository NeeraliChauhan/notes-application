
const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(function(note){
    //   return note.title === title
    // })
  /* filter will go over each note even if we have found the matching note*/ 
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note)=>note.title === title); 

  if(!duplicateNote){
    notes.push({title, body});
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {  
    console.log(chalk.red.inverse("Note title taken!"));  
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  // const existingNote = notes.filter(function(note){
  //   return note.title !== title
  // })
  const existingNote = notes.filter((note) => note.title !== title);
  if(notes.length > existingNote.length){
    console.log(chalk.green.inverse('Note removed!'));  
    saveNotes(existingNote);
  } else {
    console.log(chalk.red.inverse("No note found!"));  
  }
}

const listAllNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow("Your notes---"));
  notes.forEach(note => {
    console.log(note.title)
  });
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note)=>note.title === title)
  if(note){
    console.log(chalk.inverse.yellow(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note not found !'))
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
  addNote,
  removeNote,
  listAllNotes,
  readNote,
};