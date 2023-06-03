// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, imageTextPairs) {
  // Access the received images and text
  const imgTxtPairs = request.imageTextPairs;
  //const text = request.text;

  // Perform desired actions with the images and text
  console.log(imgTxtPairs);
  //console.log(text);
});
