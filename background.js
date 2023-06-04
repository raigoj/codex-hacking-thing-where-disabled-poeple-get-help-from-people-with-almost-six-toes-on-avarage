// Listen for messages from the content script
require('dotenv').config();
chrome.runtime.onMessage.addListener(function (data, request) {
  // Access the received images and text data.image, data.text
  console.log("wait...")
  const apiKey = process.env.API_TOKEN
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      "model": 'gpt-4',
      "messages":[{ "role": "user", "content": `Give me in a few words a good alt for this image: ${data.image} based on this text: ${data.text}. In case wher e text is not relavent to image provide alt text only based on image.`}],
      "max_tokens": 50
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data
      console.log("Got response", data);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    })

});
