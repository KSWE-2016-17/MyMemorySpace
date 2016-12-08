import UserService from "./services/UserService";
let userService = new UserService();

if(!localStorage.getItem("userid")){
	console.log("LOGIN JS");
	console.log("LOADED LOGIN-JS");

	let usernameInput;
	let passwordInput;
	let error;

	$(function() {
	  // Handler for .ready() called.
	  console.log("READY $");
	  
	  initButtons();
	  initFormFields();
	  
	  function initButtons(){
		$("#login").click(login);
		$("#register").click(register);
		}
		
		function initFormFields(){
		usernameInput = $("#username");
		passwordInput = $("#password");
		error = $("#error");
	}
	  
	});



	function login(){
		if(!checkIfFieldEmpty()){
			sendErrorMessage("Username or Password Field are empty");
			return;
		}
		checkLogin();
	}

	function register(){
		if(!checkIfFieldEmpty()){
			sendErrorMessage("Username or Password Field are empty");
			return;
		}
		checkRegister();
	}

	function checkIfFieldEmpty(){
		if(usernameInput.val() === "" || usernameInput.val() === null){
			console.log("USERNAME EMPTY");
			return false;
		}
		if(passwordInput.val() === "" || passwordInput.val() === null){
			console.log("PASSWORD EMPTY");
			return false;
		}
		
		console.log("Fields are set");
		
		return true;
		
	}

	function sendErrorMessage(msg){
		error.text(msg);
	}

	function checkLogin(){
		let name = usernameInput.val();
		let password = passwordInput.val();

		userService.findByName(name).then(function(data) {
			console.log('user: '+ data);
			if(data) {
				console.log('input password: '+ password);
				console.log('user.password: '+data.password);

				if(data.password === password){

					console.log('login succeseful');
					route();
				} else {
					//fehler password stimmt nicht überein
					console.log('fehler password stimmt nicht überein');
				}
			} else {
				//fehler user existiert nicht
				console.log('fehler user existiert nicht ');
			}
		}).catch((err) =>{
			console.log('fehler: '+err.toString());
		});
	}

	function checkRegister(){
		let name = usernameInput.val();
		let pass = passwordInput.val();
	}

	function route(){
		localStorage.setItem("userid","true");
		// similar behavior as an HTTP redirect
		window.location.replace("main.html");

		// similar behavior as clicking on a link
		//window.location.href = "http://stackoverflow.com";
	}
	
}