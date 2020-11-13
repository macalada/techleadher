
var chet = 1;
function displayImage(imageNum) {
	document.getElementById('switch').src = `../assets/img/event${imageNum}.jpg`;
}

function autoScroll() {
	frout();
	setTimeout(autoScroll, 5000);
}

window.onload = () => {
	setTimeout(autoScroll, 5000);

	document.getElementById("switch1").addEventListener('change', () => { chet = 1; displayImage(2); });
	document.getElementById("switch2").addEventListener('change', () => { chet = 2; displayImage(3); });
	document.getElementById("switch3").addEventListener('change', () => { chet = 3; displayImage(4); });
	document.getElementById("switch4").addEventListener('change', () => { chet = 4; displayImage(5); });
	document.getElementById("switch5").addEventListener('change', () => { chet = 5; displayImage(6); });
}

function frout() {
	chet++;
	if (chet > 5) { chet = 1; }
	displayImage(chet + 1);
	radiobtn = document.getElementById(`switch${chet}`);
	radiobtn.checked = true;
}
