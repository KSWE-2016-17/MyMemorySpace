/**
 * Created by xenia on 25.10.16.
 */

import aframe from 'aframe';
import registerClickDrag from 'aframe-click-drag-component';

import $ from 'jquery';

var file;

$(() => {
    registerClickDrag(aframe);

    init();

    function init() {
        // alert("loaded");
        // window.registerAframeClickDragComponent(window.AFRAME);

        $("#btnNewImagePath").click(() => {
            alert("TODO Implement me!");
        });

        $("#btnNewText").click(loadNewText);
		
		$("#upload").click(uploadFile);

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
	
	function uploadFile(){
		console.log("UPLOADUPLOADUALOD");
		var file_selected = document.getElementById("uploadfile").files;
		
		file = file_selected[0];
		console.log(file);

		
		var reader = new FileReader();
		
		var senddata = new Object();
		// Auslesen der Datei-Metadaten
		senddata.name = file.name;
		senddata.date = file.lastModified;
		senddata.size = file.size;
		senddata.type = file.type;
 
		// Wenn der Dateiinhalt ausgelesen wurde...
		reader.onload = function(theFileData) {
			senddata.fileData = theFileData.target.result; // Ergebnis vom FileReader auslesen
 
		console.log(reader);
		
		startUpload();
		
		
		/*var request = new XMLHttpRequest();
		
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		request.open("POST", "localhost:8081/upload", true);
		request.send(senddata);*/
		
		}
		
		reader.readAsDataURL(file);

	}
	
	function startUpload(){
		console.log("we are inside the upload block!");
		 $.ajax({
			  method: 'POST',         // HTTP-Methode, hier: POST
			  url: "localhost:8081/", // Wohin soll die Datei geschickt werden?
			  data: file,          // Das ist unser Datenobjekt.

			  processData: false,
			  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			  // und wenn alles erfolgreich verlaufen ist, schreibe eine Meldung
			  // in das Response-Div
			  success: function() { 
				console.log("yahoo!");
			},
			error: function(xhr, status, error) {
				console.log(error);
			}
		});
	}
	
});