//require('dotenv').config();
//const apiToken = process.env.API_TOKEN;
document.body.style.backgroundColor = "lightblue";
// Find all the image elements on the page
// Find all the image elements on the page
function findNearestText(imageElement) {
  let nearestText = null;
  let currentNode = imageElement.parentNode;

  while (currentNode && currentNode !== document.body) {
    if (currentNode.innerText.trim() !== "") {
      nearestText = currentNode.innerText.trim();
      break;
    }
    currentNode = currentNode.parentNode;
  }

  return nearestText;
}

// Message listener to handle "getData" message from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getData") {
    const imageElements = document.querySelectorAll("img");

    if (imageElements.length > 0) {
      const imageTextPairs = [];

      // Loop through each image element
      for (const imageElement of imageElements) {
        const imageURL = imageElement.src;
        const nearestText = findNearestText(imageElement);
        imageTextPairs.push({ image: imageURL, text: nearestText });
      }

      // Send the image-text pairs to the popup
      sendResponse({ imageTextPairs });
    } else {
      console.log("No image elements found on the webpage.");
    }
  }
});
