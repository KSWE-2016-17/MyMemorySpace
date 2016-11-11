/**
 * Created by xenia on 25.10.16.
 */

import aframe from 'aframe';
import registerClickDrag from 'aframe-click-drag-component';
import mongoseSchemas from './mongooseSchemas';

import $ from 'jquery';

$(() => {
    registerClickDrag(aframe);

    init();

    function init() {
        // alert("loaded");
        // window.registerAframeClickDragComponent(window.AFRAME);

        $("#btnNewImagePath").click(() => {
            mongoose.connect('mongodb://localhost/test');
           console.log("TODO Implement me!");
            var User = mongoose.model('User', mongoseSchemas.userSchema);
            // Create a user in memory
            var user = new User({name: "user1", password: "1235"});
            // Save it to database
            user.save(function(err){
                if(err){
                    console.log("write to db wars not successefull");
                    console.log(err);
                }
                else{
                    console.log(user);}
            });
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