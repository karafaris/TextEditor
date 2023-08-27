// Import the openDB function from the 'idb' library
import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    // Define the upgrade logic when opening the database
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create an object store named 'jate' with auto-incrementing keys
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
});

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented'); // Placeholder error message
  console.log('PUT to the database');     // Log message for debugging
  const jateDb = await openDB('jate', 1); // Open the 'jate' database
  const tx = jateDb.transaction('jate', 'readwrite'); // Start a transaction
  const store = tx.objectStore('jate');  // Get the 'jate' object store
  const request = store.put({ id: 1, value: content }); // Put data into the store
  const result = await request;          // Wait for the request to complete
  console.log('Data successfully saved to the database', result);
};

// Logic for a method that gets content from the database
export const getDb = async () => {
  console.error('getDb not implemented'); // Placeholder error message
  console.log('GET from the database');   // Log message for debugging
  const jateDb = await openDB('jate', 1); // Open the 'jate' database
  const tx = jateDb.transaction('jate', 'readonly'); // Start a read-only transaction
  const store = tx.objectStore('jate');   // Get the 'jate' object store
  const request = store.get(1);           // Get data from the store by key
  const result = await request;           // Wait for the request to complete
  console.log('result.value', result);
  return result?.value;                   // Return the retrieved value
};

// Initialize the database when the module is imported
initdb();
