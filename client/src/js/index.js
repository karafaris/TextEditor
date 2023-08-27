// Import the Workbox library for managing service workers
import { Workbox } from 'workbox-window';
import Editor from './editor';    // Import the Editor class from './editor.js'
import './database';              // Import code from './database.js'
import '../css/style.css';        // Import styles from '../css/style.css'

const main = document.querySelector('#main'); // Find the element with id 'main' in the DOM
main.innerHTML = '';                          // Clear its content

// Function to display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement('div'); // Create a new 'div' element
  spinner.classList.add('spinner');              // Add 'spinner' class to the element
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `; // Set the HTML content of the element to include a loading spinner
  main.appendChild(spinner); // Append the spinner element to the 'main' element
};

// Create an instance of the Editor class
const editor = new Editor();

// Check if the editor instance is undefined
if (typeof editor === 'undefined') {
  loadSpinner(); // If undefined, show the loading spinner
}

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
  // Create an instance of Workbox for managing service workers
  const workboxSW = new Workbox('/src-sw.js');

  // Register the service worker using Workbox
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
  // If service workers are not supported, log an error message
}
