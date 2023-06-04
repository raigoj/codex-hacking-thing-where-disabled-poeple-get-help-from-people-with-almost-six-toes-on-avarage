// popup.js

// This script will run when the extension's popup is opened.

// Example: Display a message when the popup is opened
document.getElementById("message").textContent = "Hello, Chrome Extension!";

document.addEventListener("DOMContentLoaded", function () {
	let currentImageIndex = 0;
	let imageTextPairs = [];

	const imageElement = document.getElementById("imageElement");
	const textElement = document.getElementById("textElement");
	const prevButton = document.getElementById("prevButton");
	const nextButton = document.getElementById("nextButton");
	const getAltButton = document.getElementById("getAltButton");

	// Function to update the image and text based on the current index
	function updateImageAndText() {
		const imageSrc = imageTextPairs[currentImageIndex].image;
		const textContent = imageTextPairs[currentImageIndex].text;
		imageElement.src = imageSrc;
		textElement.textContent = textContent;
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

	async function getAltDescription() {
		chrome.runtime.sendMessage(
			{
				text: imageTextPairs[currentImageIndex].text,
				image: imageTextPairs[currentImageIndex].image,
			},
			function (response) {
				console.log("Back in pop");
			}
		);
	}

	// Event listener for the previous button
	prevButton.addEventListener("click", goToPreviousImage);

	// Event listener for the next button
	nextButton.addEventListener("click", goToNextImage);

	// Event listener for the get Alt button
	getAltButton.addEventListener("click", getAltDescription);

	// Send a message to the content script to retrieve the image and text data
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const tab = tabs[0];
		chrome.tabs.sendMessage(tab.id, { action: "getData" }, function (response) {
			if (response && response.imageTextPairs) {
				imageTextPairs = response.imageTextPairs;
				updateImageAndText();
			}
		});
		// Get the full URL of the current image
		chrome.tabs.sendMessage(
			tab.id,
			{ action: "getCurrentImageURL" },
			function (response) {
				if (response && response.imageURL) {
					const imageURL = response.imageURL;
					console.log("Current Image URL:", imageURL);
				}
			}
		);
	});
});

// Saving API key locally
document.addEventListener("DOMContentLoaded", function () {
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
});

function processUserInput(userInput) {
	// Perform actions with the user input
	console.log("User input:", userInput);
	// Rest of your code here
}
