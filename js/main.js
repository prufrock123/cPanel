
/*
Part 1. FORM VALIDATION CODE
 */

 	// After all dependencies are loaded, app.js creates a new Validator object. 
	function Validator() {

		// Sets a property equal to the pages form inputs.
	    this.formInputs = document.forms[0].elements;

	   	// Sets a property equal to an empty array. If any of the validations fail, that validation's error message will be pushed to this array. 
	    this.error = [];

	    // Selects and sets a variable for the form submit button.
	    var submitButton = document.querySelector('#submit_btn');

	    // Adds an EventListener to the submitButton variable. When clicked, the init function in our Validator object's prototype is fired.
	    // We also bind the the current scope.
	    submitButton.addEventListener('click', this.init.bind(this));
	}

	Validator.prototype.init = function(event) {

		// Prevent Default button behavior.
	    event.preventDefault();

	    // Creates a variable equal to the formInputs property. 
	    var formInputs = this.formInputs;

	    // Creates an empty object. We will gather all of the form names and values as key/value pairs in this object.
	    var inputObject = {};

	    // Because the formInputs property was just array-like, we need to call the Array prototype's forEach method on our formInputs variable.
	    [].forEach.call(formInputs, function(element, index, array) {
	    	// A quick if statement to eliminate any invalid form elements.
	        if (!inputObject[element.id] && !element.id.length < 1) {
	            inputObject[element.id] = element.value
	        }
	    })

	    // Calls each of the Validator object's validation methods from its prototype. To each of these methods, we pass the inputObject.
	    this.validateUserName(inputObject);
	    this.validatePassword(inputObject);
	    this.validateUserNumber(inputObject);

	    // After all validations are finished, checks to see if our error array is greater than length=0. If so, call our alertErrors method, passing
	    // in the error array.
	    if (this.error.length > 0) {
	        this.alertErrors(this.error)

	       	// After passing our errors array into our alertErrors methods, we reset the errors array.
	        this.error = []
	    }
	}

	Validator.prototype.validateUserName = function(input) {

		// Creates a variable called username equal to the value of the inputObject's username property.
	    var username = input.username;

	    // Creates an errorMessage variable equal to a string explaining the cause of the failed validation.
	    var errorMessage = "Username must contain a lower and upper case letter and at least 1 number. Cannot contain special characters."

	    // A JavaScript Regular Expression that checks if the search for:
	    // 1. A digit returns -1 (meaning not found)
	    // OR
	    // 2. A lowercase alphabetical character returns -1
	    // OR
	    // 3. An uppercase alphabetical character returns -1
	    // OR
	    // 4. A special character does NOT return -1 (meaning it found a match).
	    // 
	    // If any of the above cases return true, the errorMessage string is pushed to our error array.
	    // If I were to refactor, I would probably use a boolean while search to keep things DRY-er.
	    if (username.search(/(\d+)/g) === -1 || username.search(/[a-z]+/g) === -1 || username.search(/[A-Z]+/g) === -1 || username.search(/[\W+]/g) != -1) {
	        this.error.push(errorMessage)
	    }
	}

	Validator.prototype.validatePassword = function(input) {

		// Creates a variable called password equal to the value of the inputObject's password property.
	    var password = input.password;

	    // Creates an errorMessage variable equal to a string explaining the cause of the failed validation.
	    var errorMessage = "Password must contain at least 2 numbers and be 8 to 15 characters in length."

	    // A JavaScript Regular Expression that checks if the search for:
	    // 1. 2 or more digits returns -1 (meaning not found)
	    // OR
	    // 2. 8-15 characters returns -1
	    // If any of the above cases return true, the errorMessage string is pushed to our error array.
	    if (password.search(/\d{2,}/g) === -1 || password.search(/.{8,15}/g) === -1) {
	        this.error.push(errorMessage)
	    }
	}

	Validator.prototype.validateUserNumber = function(input) {

		// Creates a variable called userNumber equal to the value of the inputObject's usernumber property.
	    var userNumber = input.usernumber;

	    // Creates an errorMessage variable equal to a string explaining the cause of the failed validation.
	    var errorMessage = "User Number must be 36 digits and have no non-numeral characters."

	    // A JavaScript Regular Expression that checks if the search for:
	    // 1. Exactly 36 characters returns -1 (meaning not found)
	    // OR
	    // 2. Any non-numeral character does NOT return -1 (meaning it found a match)
	    // If any of the above cases return true, the errorMessage string is pushed to our error array.
	    if (userNumber.search(/.{36}/g) === -1 || userNumber.search(/\D+/g) != -1) {
	        this.error.push(errorMessage)
	    }
	}

	Validator.prototype.alertErrors = function(errorArray) {

		// Creates an errorString variable equal to an empty string.
	    var errorString = ""

	    // Creates a for loop that takes each element in our non-empty errorArray and concatenates it into our errorString 
	    // with a bullet and new line for each element.
	    for (var i = 0; i < errorArray.length; i++) {
	        errorString += "\n\u2022" + errorArray[i] + "\n"
	    }

	    // Calls an alert passing in our concatenated string containing all of the failed validation's errors.
	    alert(errorString);
	}

/*
Part 2. YUI POPUP CODE
 */

 	// Requests the panel and transition modules.
	YUI().use('transition', 'panel', function(Y) {

		// Declares some variables and creates a node instance bound to the #findoutmore button.
	    var openBtn = Y.one('#findoutmore'),
	        panel, bb;

	    // Creates a showPanel function that will be used to transition in the panel.
	    function showPanel() {
	        panel.show();
	        bb.transition({
	            duration: 0.5,
	            top: '80px'
	        });
	    }

	    // Creates a hidePanel function that will be used to transition out the panel.
	    function hidePanel() {
	            bb.transition({
	                duration: 0.5,
	                top: '-300px'
	            }, function() {
	                panel.hide();
	            });
	        }
	        
	    // Instantiates a panel. This panel is created and added to the page immediately.
	    // We set the visibile value of the panel object to false, so you won't see it until you click
	    // the correct button.
	    panel = new Y.Panel({
	    	// We are using an iframe to display the content of cPanel's website.
	    	// to avoid cross origin issues, we just duplicated the source code from cPanel's website and saved it
	    	// as our own HTML file.
	        bodyContent: "<iframe src='./cPanel.html' sandbox='allow-same-origin allow-scripts allow-forms' id='popup'></iframe>",
	        width: "90%",
	        height: "70%",
	        xy: [300, -300],
	        id: 'myPanel',
	        centered: true,
	        zIndex: 5,
	        modal: true,
	        visible: false,
	        render: true,
	        buttons: [{
	                value: "close panel",
	                action: function(e) {
	                    e.preventDefault();
	                    hidePanel();
	                },
	                section: Y.WidgetStdMod.HEADER
	            }]
	    });

	    bb = panel.get('boundingBox');

	    // When the openBtn is clicked (referring to our #findoutmore button), the showPanel function is called, revealing our
	    // panel pop-up.
	    openBtn.on('click', function(e) {
	        showPanel();
	    });

	});

/*
Part 3. THE ARRAY CODE
 */

 	// Creates the array of character elements.
 	var thisArray = ['T', 'h', 'a', 'i', 's', 'b', ' ', 'i', 'c', 's', ' ', 'a', 't', 'h', 'e', 'e', ' ', 't', 's', 'o', 'r', 'n', 'g', 't', ' ', 't', 'n', 'h', 'a', 's', 't', ' ', 'o', 'n', 'e', 'o', 'v', 'e', 'a', 'r', ' ', 'f', 'e', 'n', 'a', 'd', 's', 'p', ',', ' ', 'p', 'y', 'e', 'i', 's', ' ', 'p', 'i', 't', 'o', ' ', 'g', ' ', 'o', 'e', 'i', 's', ' ', 't', 'o', 'n', 'e', ' ', 'a', ' ', 'n', 'd', ' ', ' ', 'o', 'i', 'n', ' ', 'a', 'm', 'y', ' ', ' ', 'f', 'a', 'r', 'i', ' ', 'e', 'n', 'o', 'd', 's', 'i', ' ', 'S', ' ', 'o', 'm', 'a', 'e', ' ', 'a', 'p', 'e', ' ', 'o', 'p', 'a', 'l', 'e', 'r', ' ', 's', ' ', 't', 'a', 'a', 'r', 't', ' ', 'e', 'd', 'u', ' ', 's', ' ', 'i', 'n', 'g', 'g', 'i', ' ', 'n', 'g', 'o', ' ', 'i', 't', 't', ',', ' ', ' ', 'n', 'i', 'o', 't', 'h', ' ', 'k', 'a', 'n', 'o', ' ', 'w', 'i', ' ', 'n', 'g', 'o', ' ', 'w', 'r', 'h', 'a', 'i', 't', ' ', 's', 'i', 't', 'h', ' ', 'w', 'r', 'a', 's', 'h', ' ', 'A', ' ', 'n', 'd', 'a', ' ', 't', 'o', 'h', 'e', ' ', 'y', ' ', 'a', 'w', 'i', 'p', 'l', 'l', 'o', ' ', 'c', 'r', 'o', 'n', ' ', 't', 'i', 'p', 'n', 'u', 'i', 'e', ' ', 't', 's', 'i', ' ', 'n', 'g', ' ', 'i', 'n', ' ', 'g', ' ', 's', 'i', 't', 'h', ' ', 'f', 'r', 'o', 'r', ' ', 'e', 'v', 't', 'e', 'r', 't', ' ', 'j', 'u', 'u', 's', 't', 't', ' ', 'a', 'b', 'e', 'l', 'c', 'a', ' ', 'u', 's', 'l', 'e'];
	
 	// Saves the length of the array to a variable. This serves two purposes.
 	// 1. There are slight optimization gains in not needint to recalculate the array's length on each iteration.
 	// 2. Splicing will change the length of the array on each iteration, causing the loop to terminate prematurely.
	var len = thisArray.length;

	// Creates a for loop that starts at the end of the array to avoid contaminating the index values by splicing.
	for (var i = len - 3; i >= 0; i = i - 3) {
		// Beginning with the 3rd from last element, slice the element at index i-2. Then decrement i by 3. Continue while i >= 0.
	    thisArray.splice(i - 2, 1);
	};

	// Once the array has been reduced by our for loop, set the innerHTML of the #array div equal to a joined string of our array.
	$('#array').html(thisArray.join(''))

/*
Part 4. THE FLICKR JSON FEED CODE
 */


	var getFlickPix = function() {

		// Creates a variable storing the URL of our API request. We are going to use jQuery and Flickr's JSONP, 
		// so we add 'callback=?' to the end of URL string.
		flickrURL = "http://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"

		// Passes our flickrURL variable into the $.getJSON function. We also pass it some parameters to be inserted as parameters into the URL string.
	    $.getJSON(flickrURL, {
	    	tags: "punctuation,atsign",
	    	format: "json"
	    }).then(function(data){

	    	// We run a forEach loop over the array stored at our returned object's items property.
	    	data.items.forEach(function(element){

	    		// Creates a variable equal an interpolated HTML string using _.template, a short HTML string and each element object of the
	    		// array we are looping over.
	    		var photo = _.template("<h4>{description}</h4><hr>", element)

	    		// Appends each of the interpolated HTML strings to our #flickrPhotos div.
	    		$('#flickrPhotos').append(photo);
	    	})
	    })
	}

	// Binds the #flickrpics button to a click event with the getFlickPix function as the event handler.
	$('#flickrpics').on('click', getFlickPix);
