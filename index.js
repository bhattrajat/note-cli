#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addNote, deleteNote, filterNotes, listNotes } from './utils/notes.js';

yargs(hideBin(process.argv))
  .scriptName('note')
  .command(
    'add <content>',
    'store note',
    (yargs) => {
      return yargs.positional('content', {
        type: 'string',
        describe: 'note description',
      });
    },
    (argv) => {
      addNote(argv.content);
    }
  )
  // TODO: Add option for tags
  // .option('tags', {
  //   alias: 't',
  //   type: 'string',
  //   description: 'comma separated tags to add to the note',
  // })
  .command(
    'list',
    'get all the notes',
    () => {},
    async () => {
      listNotes();
    }
  )
  .command(
    'filter <term>',
    'filter notes by term',
    (yargs) => {
      return yargs.positional('term', {
        describe:
          'The search term to filter notes by, will be applied to note.content',
        type: 'string',
      });
    },
    async (argv) => {
      filterNotes(argv.term);
    }
  )
  .command(
    'remove <id>',
    'remove note by id',
    (yargs) => {
      return yargs.positional('id', {
        describe: 'The id of the note to delete',
        type: 'number',
      });
    },
    async (argv) => {
      deleteNote(argv.id);
    }
  )
  .command(
    'web [port]',
    'launch website to see notes',
    (yargs) => {
      return yargs.positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number',
      });
    },
    async (argv) => {}
  )
  .command(
    'clean',
    'remove all notes',
    () => {},
    async (argv) => {}
  )
  .demandCommand(1)
  .parse();
