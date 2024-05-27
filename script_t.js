document.addEventListener('DOMContentLoaded', () => {
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const resetBtn = document.getElementById('reset-btn');

    let timerInterval;
    let totalSeconds;
    let paused = false;

    function formatTime(seconds) {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    }

    function startTimer() {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
    
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
        timerDisplay.textContent = formatTime(totalSeconds);
    
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                timerDisplay.textContent = formatTime(totalSeconds);
            } else {
                clearInterval(timerInterval);
                timerDisplay.textContent = "Stopp";
            }
        }, 1000);
    }
    

    startBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        paused = false;
        startTimer();
    });

    pauseBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        paused = true;
    });

    resumeBtn.addEventListener('click', () => {
        if (paused && totalSeconds > 0) {
            paused = false;
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    timerDisplay.textContent = formatTime(totalSeconds);
                } else {
                    clearInterval(timerInterval);
                }
            }, 1000);
        }
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00:00";
        hoursInput.value = 0;
        minutesInput.value = 0;
        secondsInput.value = 0;
        paused = false;
    });
});

function suport() {
    alert("Die Länge des Timers kann mit den Eingabefeldern bestimmt werden. Bei einem Klick auf 'Start', startet der Timer, bei 'Pause' wird er pausiert, bei 'Weiter' läuft er nach dem Pausieren weiter und bei 'Löschen' wird die Zeit gelöscht. Bei weiteren Fragen senden Sie mir eine Mail unter: application4classroom@gmail.com ")
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