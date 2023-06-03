//require('dotenv').config();
//const apiToken = process.env.API_TOKEN;
document.body.style.backgroundColor = 'lightblue';
// Find all the image elements on the page
// Find all the image elements on the page
const imageElements = document.querySelectorAll("img");

if (imageElements.length > 0) {
  const imageTextPairs = [];

  // Loop through each image element
  for (const imageElement of imageElements) {
    let nearestText = null;
    let parentElement = imageElement.parentElement;

    while (parentElement) {
      const textElements = parentElement.querySelectorAll("p, span, div"); // Adjust the selector to match the text elements you want to include

      if (textElements.length > 0) {
        nearestText = textElements[0].textContent.trim();
        break;
      }

      parentElement = parentElement.parentElement;
    }

    const imageURL = imageElement.src;
    imageTextPairs.push({ image: imageURL, text: nearestText });
  }

  // Send the image-text pairs to the background script
  chrome.runtime.sendMessage({ imageTextPairs });
} else {
  console.log("No image elements found on the webpage.");
}

