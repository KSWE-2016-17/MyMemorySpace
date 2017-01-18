import UserService from "./services/UserService";
import User from "./User";
import q from "q";
export default class Login{
	constructor(){
		this.userService = new UserService();
		this.usernameInputId= "#login-username";
		this.passwordInputId="#login-password";
		this.errorOutputId="#login-error";
		this.inputData = new User();
	}
	setInputValues() {
		this.inputData.username = $(this.usernameInputId).val();
		this.inputData.password = $(this.passwordInputId).val();
	}

	login(){
		this.setInputValues();
		if(!this.checkIfFieldEmpty()){
			this.sendErrorMessage("Username or Password Field are empty");
			return;
		}
		return this.checkLogin();
	}
	register(){
		this.setInputValues();
		if(!this.checkIfFieldEmpty()){
			this.sendErrorMessage("Username or Password Field are empty");
			return;
		}
		//let dataValide = this.checkRegister(this.inputData);
		//if(dataValide){
		this.checkRegister(this.inputData).then(() => {
			this.registerNewUser(this.inputData).then((res) =>{
				this.sendSuccessMessage("Register successful!");
			}).catch((err) => {
				this.sendErrorMessage("Register failed");
			});
		}).catch((err) => {
			console.log("Error");
			console.log(err);
			if(err === "Already in db"){
				this.sendErrorMessage("User is already in DB!");
			}
			else{
				this.sendErrorMessage("No Response...");
			}	
		});

	}
	checkIfFieldEmpty(){
		if(this.inputData.username === "" || this.inputData.username === null){
			console.log("USERNAME EMPTY");
			return false;
		}
		if(this.inputData.password === "" || this.inputData.password === null){
			console.log("PASSWORD EMPTY");
			return false;
		}
		console.log("Fields are set");
		return true;
	}
	sendErrorMessage(msg){
		
		$(this.errorOutputId).css('color', "red");
		$(this.errorOutputId).text(msg);
	}
	sendSuccessMessage(msg){
		$(this.errorOutputId).css('color', "green");
		$(this.errorOutputId).text(msg);
	}
	checkLogin() {
		let user = null;
        let defer = q.defer();
		this.inputData.loadFromDB().then((res) =>{
			if(res){
				if(res._id){
					console.log('login succeseful');
					user = res;
				} else {
					//fehler password stimmt nicht überein
					console.log('fehler password stimmt nicht überein');
					this.sendErrorMessage('fehler password stimmt nicht überein');
				}
			} else {
				//fehler user existiert nicht
				console.log('fehler user existiert nicht ');
				this.sendErrorMessage('fehler user existiert nicht ');
			}
			defer.resolve(user);
		}).catch((err) => {
			console.log('fehler: ' + err.toString());
            defer.reject(err);
		});
        console.log("login promise: ", defer.promise);
        return defer.promise;
	}

	reLogin(id){
		this.inputData = new User();
		this.inputData._id = id;

		let user = null;
		let defer = q.defer();
		this.inputData.loadFromDB().then((res) =>{
			if(res){
				user = res;
			} else {
				//fehler user existiert nicht
				console.log('fehler user existiert nicht ');
				this.sendErrorMessage('fehler user existiert nicht ');
			}
			defer.resolve(user);
		}).catch((err) => {
			console.log('fehler: ' + err.toString());
            defer.reject(err);
		});
        console.log("login promise: ", defer.promise);
        return defer.promise;
	}

	checkRegister(data){
		//return true;
		let defer = q.defer();
		
		this.userService.findByName(data.username).then((data) => {
			if(data){
				defer.reject("Already in db");
			}else{
				defer.resolve("Not in DB yet");
			}
		}).catch((err) => {
			defer.reject(err);
		});
		
		return defer.promise;
	}
	registerNewUser(data){
		let defer = q.defer();
		this.userService.create(data).then((data) =>{
			console.log(data);
            defer.resolve("Success");
        }).catch((err) => {
            defer.reject(err);
        });
        return defer.promise;
	}
}