/**
 * Created by xenia on 25.10.16.
 */

import aframe from 'aframe';
import registerClickDrag from 'aframe-click-drag-component';

import $ from 'jquery';

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
});