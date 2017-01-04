import aframe from 'aframe';
import registerClickDrag from 'aframe-click-drag-component';
import q from "q";
import $ from 'jquery';

import bootstrap from 'bootstrap';

import Login from "./Login";
import mainPage from "../html/main.html";
import loginPage from "../html/login.html";

let login = new Login();
let actualUser;
let actualRoom;

$(()=>{

	console.log("---");
	main();
});


function main(){
		console.log("------------Main------------");
		if(!localStorage.getItem("userid")){
			initLoginPage();
		} else {
			initMainPage();
			console.log("------------load main page------------");
		}
}

function initLoginPage(){
		console.log("------------load login page------------");
		console.log(login);
		$('body').load(loginPage,()=>{
			$("#login-button").click(()=>{
				login.login().then((user)=>{
					actualUser=user;
					console.log("actual user:");
					console.log(actualUser);
					if(actualUser){
						localStorage.setItem("userid", true);
						initMainPage();
					}
				}).fail( () => {
					console.log("User not found");
					this.sendErrorMessage('fehler user existiert nicht ');
				});

			});
			$("#register-button").click(()=>{
				login.register();
			});
		});

}


function initMainPage() {
	// window.registerAframeClickDragComponent(window.AFRAME);
		console.log("------------init main page---");
		$('body').load(mainPage).then(()=>{
			registerClickDrag(aframe);
			$("#btnNewImagePath").click(() => {
				console.log("click #btnNewImagePath");
			});

			$("#btnNewText").click(loadNewText);

			$("#logout").click(logout);

			$("#showLeft").click(showLeft);
			$("#showRight").click(showRight);

			window.onkeyup = function(e) {
				var key = e.keyCode ? e.keyCode : e.which;

				if (key == 81) {
					console.log('PRESSED Q');
					var camros = document.getElementById("mycamentity").getAttribute("rotation");
					var campos = document.getElementById("mycamentity").getAttribute("position");
					console.log(campos);

					var x = campos.x;
					var y = campos.y;
					var z = campos.z;

					camros.y += 4;
					campos.x -= 0.1;

					document.getElementById("mycamentity").setAttribute("rotation", camros);
				}

				if (key == 69) {
					var locked = document.getElementById("mycam").getAttribute('look-controls');
					console.log(locked);

					if (locked.enabled === "true") {
						document.getElementById("mycam").setAttribute('look-controls', {
							enabled: 'false'
						});
					} else {
						document.getElementById("mycam").setAttribute('look-controls', {
							enabled: 'true'
						});
					}
				}

				if (key==70){
					logout();
				}
			}
		});

}

function loadNewText() {
	var yourtext = document.getElementById("newtext").value;
	var yourcolor = document.getElementById("newcolor").value;

	var textnode = document.createElement("A-ENTITY");
	textnode.setAttribute('click-drag', 1);
	textnode.setAttribute('position', {
		x: 1,
		y: 1,
		z: 0
	});

	textnode.setAttribute("bmfont-text", "text: " + yourtext + "; color:" + yourcolor + "; width:1000");
	textnode.setAttribute("scale", {
		x: 5,
		y: 5,
		z: 1
	});

	console.log(textnode);
	document.getElementById("main-myscene").appendChild(textnode);
}

function logout(){
	console.log("Clearing local storage");
	localStorage.setItem("userid", false);
	initLoginPage();
}

function showLeft(){
	$("#main-east-panel").toggle();
}

function showRight(){
	$("#main-west-panel").toggle();
}