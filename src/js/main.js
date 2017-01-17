import aframe from 'aframe';
import registerClickDrag from 'aframe-click-drag-component';
import q from "q";
import $ from 'jquery';

import bootstrap from 'bootstrap';

import Login from "./Login";
import mainPage from "../html/main.html";
import loginPage from "../html/login.html";

import Wall from "./Wall";
import Room from "./Room";
let login = new Login();
let actualUser;
let actualRoom;
let scene;

$(()=>{

	console.log("---");
	main();
});


function main(){
		console.log("------------Main------------");
		let useridStorage= localStorage.getItem("userid");
		if(!useridStorage){
			initLoginPage();
		} else {
			if(!actualUser){
				login.reLogin(useridStorage).then((user)=>{
					actualUser=user;
					if(actualUser){
						console.log("---------- actual user: ", actualUser);
						initMainPage();
					} else {
						console.log("User not found");
					}
					console.log("------------load main page------------");
				}).catch ( (err) => {
					console.log("login failure", err);
				});
			}
		}
}

function initLoginPage(){
		console.log("------------load login page------------");
		console.log(login);
		$('body').load(loginPage, ()=>{
			$("#login-button").click(()=>{
				login.login().then((user)=>{
					actualUser=user;
					console.log("actual user: ", actualUser);
					if(actualUser){
						localStorage.setItem("userid", actualUser._id);
						initMainPage();
					}
				}).fail( (err) => {
					console.log("User not found");
                    console.log(err);
					this.sendErrorMessage('fehler user existiert nicht ');
				});

			});
			$("#register-button").click(()=>{
				login.register();
			});
		});

}


function initMainPage() {
		console.log("------------init main page---");
		$('body').load(mainPage, () => {
            registerClickDrag(aframe);
            initMainPageButtons();
            registerKeyEvents();
			scene = $('#main-myscene');
            loadRoom().then( () => {
				renderRoom();
			}).fail( ( ) => {
				renderRoom();
			});

        });

}

function initMainPageButtons(){
	console.log("initMainPageButtons()");
	$("#btnNewImagePath").click(() => {
		console.log("click #btnNewImagePath");
	});

	$("#btnNewText").click(loadNewText);

	$("#logout").click(logout);

	$("#showLeft").click(showLeft);
	$("#showRight").click(showRight);
}

function registerKeyEvents(){
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
}
function loadRoom(){
   /* actualRoom = new Room({ roomname: "testRoom", walls: [
		{color: '#330000', direction: 'right'},
		{color: '#003300', direction: 'left'},
		{color: '#000033', direction: 'back'},
		{color: '#330033', direction: 'front'},
		{color: '#ff3333', direction: 'up'},
		{color: '#3333ff', direction: 'down'}
	]}, actualUser.getId());*/
   	actualRoom = new Room(null, actualUser.getId());
	console.log("main loadRoom: ", actualRoom);
	return actualRoom.loadFromDB();
}

function renderRoom(){
	console.log("+++++++++++renderRoom",actualRoom );
	let walls = actualRoom.walls;
	walls.forEach((wall) => {
		let box = $('<a-box></a-box>');
		box.attr('position', ""+wall.position.x+" "+wall.position.y+" "+wall.position.z);
		box.attr('width', wall.getDefaultWidth());
		box.attr('height', wall.getDefaultHeight());
		box.attr('depth', wall.getDefaultDepth());
		box.attr('rotation', (""+wall.rotation.x + " " + wall.rotation.y + " "+ wall.rotation.z));
		box.attr('id', "wall-"+wall.getDirection());
		box.attr('color', wall.getColor());
		scene.append(box);
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
	localStorage.setItem("userid", null);
	actualUser = null;
	initLoginPage();
}

function showLeft(){
	$("#main-east-panel").toggle();
}

function showRight(){
	$("#main-west-panel").toggle();
}