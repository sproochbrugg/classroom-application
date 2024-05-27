const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cx = canvas.width / 2;
const cy = canvas.height / 2;

const results = [1, 2, 3, 4, 5, 6, 7];
drawWheel();

function turnWheel() {
    const resultIndex = Math.floor(Math.random() * results.length);
    const randomResult = results[resultIndex];
    console.log(randomResult);

    setupTimer();

    endAngle = randomNumber(
        2 * Math.PI / results.length * (results.length - resultIndex - 1) + stepSize,
        2 * Math.PI / results.length * (results.length - resultIndex) - stepSize
    );

    window.requestAnimationFrame(step);
}

let maxCount, count, count2, timerStart, angle, endAngle;
const tps = 50;
const stepSize = 3 * Math.PI / tps;

function setupTimer() {
    count = 0;
    maxCount = Math.random() * 5 * tps + 2 * tps;
    angle = -(2 * Math.PI / results.length / 2);
}

function step(timestamp) {
    if (timerStart === undefined) timerStart = timestamp;
    const elapsed = timestamp - timerStart;
    count++;
    if (elapsed > 1000 / tps) {
        timerStart = timestamp;
        if (count > maxCount) {
            spinning = false; // Setze spinning auf false, wenn das Rad aufhört zu drehen
            const angleInCircle = angle % (2 * Math.PI);
            const diff = mod(endAngle - (angleInCircle > endAngle ? angleInCircle - 2 * Math.PI : angleInCircle), 2 * Math.PI) / (2 * Math.PI);
            angle += Math.max(0.005, Math.min(1, diff + 0.1) * stepSize);
        } else {
            spinning = true; // Setze spinning auf true, wenn das Rad dreht
            angle += stepSize;
        }

        drawWheel(angle);
        if (count > maxCount && Math.abs(angle % (2 * Math.PI) - endAngle) < stepSize && angle % (2 * Math.PI) > endAngle) {
            const sectorAngle = (2 * Math.PI) / results.length;
            const selectedResultIndex = Math.floor((results.length - 1 - angle / sectorAngle) % results.length);
            const selectedResult = results[selectedResultIndex];
            showResult(selectedResult);
            return;
        }
    }

    window.requestAnimationFrame(step);
}





function drawWheel(rotatedBy) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.translate(cx, cy);
    ctx.rotate((rotatedBy || -2 * Math.PI / results.length / 2) - Math.PI / 2);

    for (let i = 0; i < results.length; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 280, 2 * Math.PI / results.length * (i), 2 * Math.PI / results.length * (i + 1), false); // Größere Radgröße
        ctx.lineTo(0, 0);
        ctx.lineWidth = 20; // Größere Linienbreite
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.closePath();
        ctx.fill();
        ctx.save();

        ctx.font = "36px Arial"; // Größere Schriftgröße
        ctx.fillStyle = 'black';
        ctx.translate(180 * Math.cos(2 * Math.PI / results.length * (i + 0.5)), 180 * Math.sin(2 * Math.PI / results.length * (i + 0.5))); // Änderung der Positionierung der Ergebnisse
        ctx.rotate(2 * Math.PI / results.length * (i) - 1.35 * Math.PI);
        ctx.textAlign = "center";
        ctx.fillText(results[i], 0, 10);
        ctx.restore();
    }

    ctx.moveTo(0, 0);
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, 2 * Math.PI, false); // Größere Punktmakierung
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 12; // Größere Linienbreite
    ctx.stroke();

    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 20);
    ctx.lineTo(canvas.width/2 - 20, 0); // Hier können Sie die Linienlänge ändern
    ctx.lineTo(canvas.width/2 + 20, 0); // Hier können Sie die Linienlänge ändern
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width/2 - 2, 20, 4, 40); // Rote Linie nach unten
    ctx.closePath()
    ctx.fill();
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function showResult(result) {
    const popupText = document.getElementById("popupText");
    popupText.innerText = "Die ausgewählte Zahl ist: " + result;
    const popup = document.getElementById("popup");
    popup.style.display = "block";
    
    // Aktualisieren Sie das HTML-Element mit der ausgewählten Zahl
    const selectedResultElement = document.querySelector('.selected-result');
    selectedResultElement.innerText = result;
}


function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

let spinning = false;

function addDivision() {
    if (!spinning && results.length < 30) {
        results.push(results.length + 1);
        drawWheel();
    } else if (spinning) {
        
    } else {
        alert("Sie können nicht mehr als 30 Abteilungen haben.");
    }
}

function removeDivision() {
    if (!spinning && results.length > 2) {
        results.pop();
        drawWheel();
    } else if (spinning) {
        
    } else {
        alert("Sie können nicht weniger als zwei Abteilungen haben.");
    }
}
function suport() {
    alert("Mit den Tasten + und - kann die Anzahl Felder geändert werden. Bei einem Klick auf Drehen wird das Glücksrad dann gedreht. Bei weiteren Fragen senden Sie mir eine Mail unter: application4classroom@gmail.com");
}
// JavaScript functions to control the modal
function openModal() {
    document.getElementById('myModal').style.display = "flex";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}
// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}