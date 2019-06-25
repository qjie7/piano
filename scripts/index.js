var context;
// Create an Audio Context Object

var freq = [130, 147, 165, 175, 196, 220, 246, 262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047];

function initialContext() {
    if (context) {
        return;
    }
    context = new AudioContext();
}
/**
 * Sound Creating
 * @param index 
 */
function makeSound(index) {
    var oscillator = context.createOscillator(); // create an oscillator controller object
    var gainControl = context.createGain(); // create an volume/gain controller object
    oscillator.connect(gainControl); // connect both oscillator and volume/gain controller
    oscillator.type = "sine"; // Soundwave: sine wave 
    oscillator.frequency.value = freq[index]; // set the frequency value of the soundwave in Hz
    gainControl.connect(context.destination); //connect volume controller to default system speaker
    gainControl.gain.value = 0; // set volume to 0
    gainControl.gain.linearRampToValueAtTime(0.5, context.currentTime + 0.01); // after 0.01 secs , set the volume from 0 to 0.5

    oscillator.start(); //Start
    gainControl.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1.5); // play the sound gradually within 1.5 secs

    oscillator.stop(context.currentTime + 1.5); // stop after 1.5 seconds
}

//set what will happen during mouse down and mouse up
var lis = document.querySelectorAll(".piano li");

for (var i = 0; i < lis.length; i++) {
    var li = lis[i];
    (function (i) {
        li.onmousedown = function () {
            initialContext();
            makeSound(i);
            this.style.background = "#ccc"; // Key pressed: grey colour
        }
        li.onmouseup = function () {
            this.style.background = "#fff"; // Key released: white colour 
        }
    }(i))
}