document.addEventListener("DOMContentLoaded", function(event) {
    const trafficLight = document.getElementById('trafficLight');
    const startButton = document.getElementById('startButton');
    const greenMinInput = document.getElementById('greenMin');
    const greenMaxInput = document.getElementById('greenMax');
    const yellowMinInput = document.getElementById('yellowMin');
    const yellowMaxInput = document.getElementById('yellowMax');
    
    startButton.addEventListener('click', function() {
        const greenMin = parseInt(greenMinInput.value);
        const greenMax = parseInt(greenMaxInput.value);
        const yellowMin = parseInt(yellowMinInput.value);
        const yellowMax = parseInt(yellowMaxInput.value);
        
        //setzt Grün als start farbe fest
        trafficLight.style.backgroundColor = 'green';
        
        // wechselt zu Gelb nach einer Zufälligen Zeit
        setTimeout(function() {
            trafficLight.style.backgroundColor = 'yellow';
            
            // wechselt zu Rot nach einer Zufälligen Zeit
            setTimeout(function() {
                trafficLight.style.backgroundColor = 'red';
            }, getRandomDuration(yellowMin, yellowMax) * 1000);
            
        }, getRandomDuration(greenMin, greenMax) * 1000);
    });
    
    // Function um die zufällige Zeit zu machen
    function getRandomDuration(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
function suport() {
    alert("Green Yellow Red dient der zufälligen Generierung einer Zeitlimite in einer festgelegten Zeitspanne. Die vier Eingabefelder dienen dazu, dass die zeitlichen Längen, welche grün und gelb angezeigt werden, definiert werden. Bei 'grün mindestens' wird die Länge festgelegt, wie lange grün mindestens angezeigt werden soll. Bei 'grün maximal' wird die Länge festgelegt, wie lange grün maximal angezeigt werden soll. Das Gleiche gilt für 'gelb mindestens' und 'gelb maximal'. Beim Klick auf 'Start' wird dann grün und gelb entsprechend der Länge der Eingaben angezeigt. Nach dem Ablauf der Zeit wird anschliessend mit der Farbe Rot das Ende angezeigt. Das Quadrat bleibt solange rot bis erneut 'Start' geklickt wird. Bei weiteren Fragen senden Sie mir eine Mail unter: application4classroom@gmail.com");
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