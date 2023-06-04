// Listen for messages from the content script
//require('dotenv').config();
let result = chrome.runtime.onMessage.addListener(function (data, request) {
  chrome.storage.local.get("userInput", function (result) {
    apiKey = result.userInput
    getGPTResponse(apiKey, data)
      .then(res => {
        // Send a message f to the popup script
        chrome.runtime.sendMessage({ data: [res.choices[0].message.content, 'two', 'three'] });
      })
  });
});

function getGPTResponse(apiKey, data) {
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Give me in a few words a good alt for this image: ${data.image} based on this text: ${data.text}. In case wher e text is not relavent to image provide alt text only based on image.`,
        },
      ],
      max_tokens: 50,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      return data
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });
}
