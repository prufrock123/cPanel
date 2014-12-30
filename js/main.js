





// var thisArray = ['T', 'h', 'a', 'i', 's', 'b', ' ', 'i', 'c', 's', ' ', 'a', 't', 'h', 'e', 'e', ' ', 't', 's', 'o', 'r', 'n', 'g', 't', ' ', 't', 'n', 'h', 'a', 's', 't', ' ', 'o', 'n', 'e', 'o', 'v', 'e', 'a', 'r', ' ', 'f', 'e', 'n', 'a', 'd', 's', 'p', ',', ' ', 'p', 'y', 'e', 'i', 's', ' ', 'p', 'i', 't', 'o', ' ', 'g', ' ', 'o', 'e', 'i', 's', ' ', 't', 'o', 'n', 'e', ' ', 'a', ' ', 'n', 'd', ' ', ' ', 'o', 'i', 'n', ' ', 'a', 'm', 'y', ' ', ' ', 'f', 'a', 'r', 'i', ' ', 'e', 'n', 'o', 'd', 's', 'i', ' ', 'S', ' ', 'o', 'm', 'a', 'e', ' ', 'a', 'p', 'e', ' ', 'o', 'p', 'a', 'l', 'e', 'r', ' ', 's', ' ', 't', 'a', 'a', 'r', 't', ' ', 'e', 'd', 'u', ' ', 's', ' ', 'i', 'n', 'g', 'g', 'i', ' ', 'n', 'g', 'o', ' ', 'i', 't', 't', ',', ' ', ' ', 'n', 'i', 'o', 't', 'h', ' ', 'k', 'a', 'n', 'o', ' ', 'w', 'i', ' ', 'n', 'g', 'o', ' ', 'w', 'r', 'h', 'a', 'i', 't', ' ', 's', 'i', 't', 'h', ' ', 'w', 'r', 'a', 's', 'h', ' ', 'A', ' ', 'n', 'd', 'a', ' ', 't', 'o', 'h', 'e', ' ', 'y', ' ', 'a', 'w', 'i', 'p', 'l', 'l', 'o', ' ', 'c', 'r', 'o', 'n', ' ', 't', 'i', 'p', 'n', 'u', 'i', 'e', ' ', 't', 's', 'i', ' ', 'n', 'g', ' ', 'i', 'n', ' ', 'g', ' ', 's', 'i', 't', 'h', ' ', 'f', 'r', 'o', 'r', ' ', 'e', 'v', 't', 'e', 'r', 't', ' ', 'j', 'u', 'u', 's', 't', 't', ' ', 'a', 'b', 'e', 'l', 'c', 'a', ' ', 'u', 's', 'l', 'e'];
// var len = thisArray.length;
// document.write("<br /><h2>Part 3: The Array:</h2>");
// for (var i = 1; i <= len; i++) {
//     document.write(thisArray[i]);
// }


function Validator() {
	this.formInputs = document.forms[0].elements;
	var submitButton = document.querySelector('#submit_btn');
	
	this.error = [];
	
	submitButton.addEventListener('click', this.init.bind(this));
}

Validator.prototype.init = function(event) {
	event.preventDefault();

	var formInputsArray = this.formInputs;

	var inputObject = {};

	[].forEach.call(formInputsArray, function(element, index, array) {
		if(!inputObject[element.id] && !element.id.length<1 ) {
			inputObject[element.id] = element.value
		}
	})

	this.validateUserName(inputObject);
	this.validatePassword(inputObject);
	this.validateUserNumber(inputObject);
	
	if (this.error.length > 0) {
		this.alertErrors(this.error)
		this.error = []
	}
}

Validator.prototype.validateUserName = function(input) {
	var username = input.username;
	var errorMessage = "Username must contain a lower and upper case letter and at least 1 number. Cannot contain special characters."
	if (username.search(/(\d+)/g) === -1 || username.search(/[a-z]+/g) === -1 || username.search(/[A-Z]+/g) === -1 || username.search(/[\W+]/g) != -1) {
		this.error.push(errorMessage)
	}
}

Validator.prototype.validatePassword = function(input) {
	var password = input.password;
	var errorMessage = "Password must contain at least 2 numbers and be 8 to 15 characters in length."
	if (password.search(/\d{2,}/g) === -1 || password.search(/.{8,15}/g) === -1) {
		this.error.push(errorMessage)
	}
}

Validator.prototype.validateUserNumber = function(input) {
	var userNumber = input.usernumber;
	var errorMessage = "User Number must be 36 digits and have no non-numeral characters."
	if (userNumber.search(/.{36}/g) === -1 || userNumber.search(/\D+/g) != -1) {
		this.error.push(errorMessage)
	}
}

Validator.prototype.alertErrors = function(errorArray) {
	var errorString = ""
	for (var i = 0; i < errorArray.length; i++) {
		errorString += "\n\u2022" + errorArray[i] + "\n"
	}

	console.log(errorString)
	alert(errorString);
}












