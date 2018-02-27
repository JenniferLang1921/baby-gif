//Initial array of babies
var topics = ['kittens', 'puppies', 'baby birds', 'babies', 'baby pandas', 'baby raccoons'];


// -------------------------- Functions  --------------------------
$( document ).ready(function(){

	// Append Initial baby buttons
	renderButtons();

	// Call AJAX function to display baby Giphy on selected baby button
	$(document).on('click', '.baby_button', displayBabyGif);


	$(document).on('click', '.gif_container', showGifHideImage);

	// ===================================================================

	// Append Baby Buttons to DOM
	function renderButtons(){ 

		// Deletes any previous button to prevent duplicates
		$('#baby_buttons').empty();

		// Loops through the array of animals
		for (var i = 0; i < topics.length; i++){

			// Then dynamicaly generate a button for each baby in the array 
		    var babyButton = $('<button>') 
		    babyButton.addClass('baby_button'); // Added a class 
		    babyButton.attr('data-name', topics[i]); // Added a data-attribute
		    babyButton.text(topics[i]); // Provided the initial button text
		    $('#baby_buttons').append(babyButton); // Added the button to the HTML
		}
	}

	// ===================================================================

	// Add new babies from the user input
	$('#add_baby').on('click', function(){

		// Grab the input from the textbox
		var newBaby = $('#baby_input').val().trim().toLowerCase();


		// Validate user input
		var isUnique = true;
		for(var i = 0; i < topics.length; i++){
			if(topics[i] == newBaby){
				isUnique = false;
			}
		}


		// Append new button if the input is unique
		if(newBaby == ""){
			alert("Sorry. No empty buttons are allowed!")
		}
		else if(isUnique){

			// Add the new baby to the original list
			topics.push(newBaby);
		
			
			// Add new buttons to the DOM
			renderButtons();

		}
		else{
			alert("You already have a " + newBaby + " button!")
		}


		// Remove the default features of the Submit Button
		return false;
	})


	// ===================================================================

	// Collect Baby gif from GIPHY and display it to the DOM when the baby button is clicked
	function displayBabyGif(){

		// Deletes old gifs
		$('#baby_images').empty();

		// Collect baby name data attribute from the button, replacing any spaces
		var baby = $(this).attr('data-name').replace(/ /g, '+');

		// Create the API URL
		var publicKey = "bKjaF5w4laYqHe926WBzSgBKCIsghyHV"; // Public API Key
		var limit = "10"; // Limit API to 10 gifs
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + baby + "&limit=" + limit + "&api_key=" + publicKey;
		//console.log(queryURL);

		
		// Creates AJAX call for the specific baby button being clicked
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){

			// Loop through the JSON output to collect each Baby Object
			for(var i = 0; i < response.data.length; i++){

				// Collect the baby gif URLs
				var currentStillURL = response.data[i].images.fixed_height_still.url; // still image 
				var currentMovingURL = response.data[i].images.fixed_height.url; // moving image

				// Collect the baby gif Ratings
				var currentRating = response.data[i].rating;

					// Correct for empty rating
					if(currentRating == ""){
						currentRating = "none";
					}


				// Create a Div to house Gif and Rating
				var currentGifDiv = $('<div>');
				currentGifDiv.addClass('gif_container'); // Added a class
				currentGifDiv.attr('data-name', "unclicked"); // Added a Data Attributed for clicked
				
				// Append Rating to current gif
				var currentGifRating = $('<h1>');
				currentGifRating.text("Rating: " + currentRating);
				currentGifDiv.append(currentGifRating);

				// Append Still Image
				var currentGifImage = $('<img>');
				currentGifImage.addClass('still_gif'); // Added a class for still gif
				currentGifImage.attr("src", currentStillURL);
				currentGifDiv.append(currentGifImage);

				// Append Moving Gif Image
				var currentGif = $('<img>')
				currentGif.addClass('moving_gif'); // Added a class for animated gif
				currentGif.attr("src", currentMovingURL);
				currentGif.hide(); // Hide the moving gif
				currentGifDiv.append(currentGif);

				// Append current Div to the DOM
			    $('#baby_images').append(currentGifDiv);

			}

		});	
	}

	// ===================================================================
	
	// Display the Moving gif and Hide the still Image (and vice versa)
	function showGifHideImage(){

		// Determine in the gif was already clicked
		var clickTest = $(this).attr('data-name');
		
		// Gif is not clicked yet - Hide the still image & display the moving image
		if(clickTest == "unclicked"){

			var gifChildren = $(this).children();

			// Hide the Still Image
			$(gifChildren[1]).hide();

			// Display the Moving Image
			$(gifChildren[2]).show();

			// Change Data Name to clicked
			$(this).attr('data-name', "clicked");

		}
		// Gif was already clicked - Hide the moving image & show the still image
		else{

			var gifChildren = $(this).children();

			// Hide the Moving Image
			$(gifChildren[2]).hide();

			// Display the Still Image
			$(gifChildren[1]).show();


			// Change Data Name to unclicked
			$(this).attr('data-name', "unclicked");

		}
	
	}

	// ===================================================================

});