import aframe from 'aframe';
import registerClickDrag from 'aframe-click-drag-component';

import $ from 'jquery';

import bootstrap from 'bootstrap';

import "./Login.js";

import "../html/main.html";
import Login from "./Login";

let login = new Login();
let actualUser;
main();

function main(){
	$(() => {
		if(localStorage.getItem("userid")){
			initMainPage();
		} else {
			initLoginPage();
		}
	});
}

function initLoginPage(){
	$(()=>{
		$("#login").click(()=>{
			actualUser = login.login();
		});
		$("#register").click(()=>{
			login.register();
		});
	});
}


function initMainPage() {
	// window.registerAframeClickDragComponent(window.AFRAME);
	localStorage.setItem("userid","true");
	window.location.replace("main.html");
	registerClickDrag(aframe);
	$("#btnNewImagePath").click(() => {

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
	document.getElementById("myscene").appendChild(textnode);
}

function logout(){
	console.log("Clearing local storage");
	localStorage.clear();
	window.location.replace("http://localhost:3000/index.html");
}

function showLeft(){
	$("#east").toggle();
}

function showRight(){
	$("#west").toggle();
}