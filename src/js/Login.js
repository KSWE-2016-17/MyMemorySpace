import UserService from "./services/UserService";
import User from "./User";
import q from "q";
export default class Login{
	constructor(){
		this.userService = new UserService();
		this.usernameInputId= "#username";
		this.passwordInputId="#password";
		this.errorOutputId="#error";
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
		let dataValide = this.checkRegister();
		if(dataValide){
			this.registerNewUser(this.inputData);
		}
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
		$(this.errorOutputId).text(msg);
	}
	checkLogin() {
		let user = null;
		let name = this.inputData.username;
		let password = this.inputData.password;
        let defer = q.defer();
		this.userService.findByName(name).then(function (data) {
            console.log('--------start login function: ');
			console.log('user: ');
			console.log(data);
			if (data) {
				console.log('input password: ' + password);
				console.log('user.password: ' + data.password);

				if (data.password === password) {

					console.log('login succeseful');
					user = new User(data);
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
            console.log("login result user:");
            console.log(user);
            console.log('--------end login function: ');
            defer.resolve(user);

		}).catch((err) => {
			console.log('fehler: ' + err.toString());
            defer.reject(err);

		});
        console.log("login promise");
        console.log(defer.promise);
        return defer.promise;
	}
	checkRegister(){
		return true;
	}
	registerNewUser(data){

	}
}