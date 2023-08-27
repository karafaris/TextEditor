// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database'; // Import functions for interacting with indexedDB
import { header } from './header';         // Import the 'header' content

// Define a class
export default class {
  constructor() {
    const localData = localStorage.getItem('content'); // Retrieve data from localStorage

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded'); // Throw an error if CodeMirror is not available
    }

    // Create a CodeMirror editor instance
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, populate it with content from indexedDB or localStorage
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header); // Set content to retrieved data or fallbacks
    });

    // Listen for changes in the editor's content and store it in localStorage
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor to indexedDB when it loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content')); // Save content to indexedDB using putDb function
    });
  }
}
