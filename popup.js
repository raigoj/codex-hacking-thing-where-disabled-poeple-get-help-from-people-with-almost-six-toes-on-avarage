// popup.js

// This script will run when the extension's popup is opened.

// Example: Display a message when the popup is opened
document.getElementById('message').textContent = 'Hello, Chrome Extension!';


document.addEventListener("DOMContentLoaded", function() {
  const runContentScriptButton = document.getElementById("runContentScriptButton");

  runContentScriptButton.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
    });
  });
});
