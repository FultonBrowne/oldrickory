/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

let baseFontSize = 16;  // This is a starting value; adjust as needed.
const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"5",
	"4",
	"3",
	"2",
	"1",
	"0"
];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];
elts.text1.style.opacity = "0"
elts.text2.style.opacity = "0"
function doMorph() {
	morph -= cooldown;
	cooldown = 0;

	let fraction = morph / morphTime;

	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}

	setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	baseFontSize += 1;
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
	elts.text1.style.fontSize = `${baseFontSize}px`;
    elts.text2.style.fontSize = `${baseFontSize}px`;


}

function doCooldown() {
	morph = 0;

	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";

	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
	if (textIndex >= (texts.length * 2) - 1) {
		// Stop once we've gone through all the texts
		window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        return;
    }
	requestAnimationFrame(animate);

	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;

	cooldown -= dt;
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			console.log("test")
			audio.pause()
			audio.currentTime = 0;
			audio.play()
			textIndex++;
		}
		doMorph();
	} else {
		doCooldown();
	}
	console.log(textIndex, texts.len)
}

// Start the animation.

function go(){
	document.getElementById("start").style.opacity = "0"
	elts.text1.style.opacity = "1"
	elts.text2.style.opacity = "1"
	animate();
}