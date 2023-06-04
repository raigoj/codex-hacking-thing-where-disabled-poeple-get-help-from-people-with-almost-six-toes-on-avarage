// popup.js

// This script will run when the extension's popup is opened.

// Example: Display a message when the popup is opened

let alt_texts = ['', '', '']
let currentImageIndex = 0;
let imageTextPairs = [];
let imageElement

document.addEventListener("DOMContentLoaded", function () {
	saveApiKeyLocaly()
	updateAltTexts()

	imageElement = document.getElementById("imageElement");

	// Event listener for the previous button
	const prevButton = document.getElementById("prevButton");
	prevButton.addEventListener("click", goToPreviousImage);

	// Event listener for the next button
	const nextButton = document.getElementById("nextButton");
	nextButton.addEventListener("click", goToNextImage);

	// Event listener for the get Alt button
	const getAltButton = document.getElementById("getAltButton");
	getAltButton.addEventListener("click", getAltDescription);

	//add alternative navigation
	document.addEventListener('keydown', function (event) {
		if (event.key === 'ArrowLeft') {
			prevButton.click()
		} else if (event.key === 'ArrowRight') {
			nextButton.click()
		} else if (event.key === 'Enter') {
			getAltButton.click()
		}
	})

	// Send a message to the content script to retrieve the image and text data
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const tab = tabs[0];
		getImageTextPairs(tab)
		getImageUrl(tab)
	});
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log('Message received in the popup script:', message);
	alt_texts = message.data
	updateAltTexts()
});

function getImageTextPairs(tab) {
	chrome.tabs.sendMessage(tab.id, { action: "getData" }, function (response) {
		if (response && response.imageTextPairs) {
			imageTextPairs = response.imageTextPairs;
			updateImageAndText();
		}
	});
}
function getImageUrl(tab) {
	chrome.tabs.sendMessage(
		tab.id,
		{ action: "getCurrentImageURL" },
		function (response) {
			if (response && response.imageURL) {
				const imageURL = response.imageURL;

			}
		}
	);
}
async function getAltDescription() {
	chrome.runtime.sendMessage(
		{
			text: imageTextPairs[currentImageIndex].text,
			image: imageTextPairs[currentImageIndex].image,
		},
		function (response) {
			alt_texts = response
			updateAltTexts()
			console.log("Back in pop", response);
		}
	);
}

// Function to navigate to the previous image
function goToPreviousImage() {
	currentImageIndex--;
	if (currentImageIndex < 0) {
		currentImageIndex = imageTextPairs.length - 1;
	}
	updateImageAndText();
}

// Function to navigate to the next image
function goToNextImage() {
	currentImageIndex++;
	if (currentImageIndex >= imageTextPairs.length) {
		currentImageIndex = 0;
	}
	updateImageAndText();
}

// Function to update the image and text based on the current index
function updateImageAndText() {
	const imageSrc = imageTextPairs[currentImageIndex].image;
	imageElement.src = imageSrc;
	alt_texts = ['', '', '']
	updateAltTexts()
}
function updateAltTexts() {
	for (let i = 0; i < 3; i++) {
		document.getElementById(`${i + 1}-alt`).innerText = alt_texts[i]
	}
}

function saveApiKeyLocaly() {
	// Check if user input is already stored in local storage
	chrome.storage.local.get("userInput", function (result) {
		if (result.userInput) {
			// User input is already stored, use it
			processUserInput(result.userInput);
		} else {
			// User input is not stored, prompt the user
			var userInput = prompt("Please enter your ChatGTP-4 API key: ");
			if (userInput) {
				// User entered input, store it in local storage
				chrome.storage.local.set({ userInput: userInput }, function () {
					console.log("User input stored successfully");
				});
				processUserInput(userInput);
			}
		}
	});
}



function processUserInput(userInput) {
	// Perform actions with the user input
	console.log("User input:", userInput);
	// Rest of your code here
}
