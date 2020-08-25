
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// add, remove, read, list notes

//Create add command
yargs.command({
   command: 'add',
   describe: 'Add a new note',
   builder: {
     title: {
       describe: 'Note title',
       demandOption: true,
       type: 'string'
     },
     body: {
       describe: 'Note body',
       demandOption: true,
       type: 'string'
     }
   },
   handler(argv) {
     notes.addNote(argv.title, argv.body)
   }
})


// Create Remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      type: 'string',
      describe: 'title of the note',
      demandOption: true
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listAllNotes();
  },
});

// Create Read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      type: "string",
      describe: "title of the note",
      demandOption: true,
    },
  },
  handler(argv) {
    notes.readNote(argv.title)
  },
});

yargs.parse();