// Get the reference to the "buttonInstall" element in the DOM
const butInstall = document.getElementById("buttonInstall");

// Logic for installing the Progressive Web App (PWA)

// Event handler for the "beforeinstallprompt" event
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the event for later use
  window.deferredPrompt = event;

  // Show the "Install" button by removing the "hidden" class
  butInstall.classList.toggle("hidden", false);
});

// Click event handler for the "Install" button
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  // Check if the deferred prompt event is available
  if (!promptEvent) {
    return;
  }

  // Show the installation prompt
  promptEvent.prompt();

  // Clear the stored deferred prompt event
  window.deferredPrompt = null;

  // Hide the "Install" button by adding the "hidden" class
  butInstall.classList.toggle("hidden", true);
});

// Event handler for the "appinstalled" event
window.addEventListener("appinstalled", (event) => {
  // Clear the stored deferred prompt event after the app is installed
  window.deferredPrompt = null;
});
