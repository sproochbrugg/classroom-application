var textInputs = new Map(); // Map zur Zuordnung von Textfeldern zu Quadraten

// Funktion zum Hinzufügen des Quadrats und Aktivieren der Drag-Funktion
function addSquare(input) {
    var columnContainer = input.closest('.columnContainer');
    var columnColor = window.getComputedStyle(columnContainer).backgroundColor;

    var square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = columnColor; // Setzt die Hintergrundfarbe des Quadrats
    square.style.position = 'absolute'; // Position des Quadrats auf absolut setzen

    // Fügt das Quadrat dem squareContainer hinzu
    var squareContainer = document.getElementById('squareContainer');
    squareContainer.appendChild(square);

    // Aktiviert die Drag-Funktion für das Quadrat
    enableDrag(square);
    
    // Speichert die Zuordnung zwischen Textfeld und Quadrat
    textInputs.set(input, square);
}

// Funktion zur Aktivierung der Drag-Funktion für ein Quadrat
function enableDrag(element) {
    var offsetX = 0, offsetY = 0;
    element.addEventListener('mousedown', startDragging);

    function startDragging(e) {
        e.preventDefault();
        // Berechnet den Offset zwischen der Mausposition und der Position des Quadrats
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        // Fügt Event Listener hinzu, um das Verschieben des Quadrats und das Loslassen der Maus zu verfolgen
        document.addEventListener('mousemove', dragSquare);
        document.addEventListener('mouseup', stopDragging);
    }

    function dragSquare(e) {
        e.preventDefault();
        // Berechnet die neue Position des Quadrats basierend auf der Mausposition und dem Offset
        var x = e.clientX - offsetX;
        var y = e.clientY - offsetY;
        // Setzt die neue Position des Quadrats
        element.style.left = x + 'px';
        element.style.top = y + 'px';
    }

    function stopDragging() {
        // Entfernt die Event Listener, wenn das Verschieben abgeschlossen ist
        document.removeEventListener('mousemove', dragSquare);
        document.removeEventListener('mouseup', stopDragging);
    }
}

// Funktion zum Hinzufügen einer neuen Spalte mit leeren Textfeldern und farbigem Quadrat
function addColumn() {
    var columnContainer = createColumnContainer(true); // Leere Textfelder erstellen
    columnContainer.style.backgroundColor = getRandomColor(); // Zufällige Hintergrundfarbe festlegen
    document.getElementById('gt').appendChild(columnContainer);

    // Fügt farbige Quadrate für die beiden Textfelder am Anfang der Spalte hinzu
    var inputContainers = columnContainer.querySelectorAll('.textInputContainer');
    inputContainers.forEach(function(inputContainer) {
        var newInput = inputContainer.querySelector('.textInput');
        addSquare(newInput);
    });
}

// Funktion zum Erstellen eines Spaltencontainers mit Löschtaste
function createColumnContainer(emptyInputs) {
    var columnContainer = document.createElement('div');
    columnContainer.classList.add('columnContainer');

    // Neue Löschtaste für die Spalte
    var deleteColumnButton = document.createElement('button');
    deleteColumnButton.textContent = 'Spalte entfernen';
    deleteColumnButton.classList.add('deleteButton');
    deleteColumnButton.onclick = removeColumn;
    columnContainer.appendChild(deleteColumnButton);

    // Leere Textfelder oder Textfelder mit Platzhalter hinzufügen
    for (var i = 0; i < 2; i++) {
        var inputFieldContainer = document.createElement('div');
        inputFieldContainer.classList.add('textInputContainer');
        var newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.classList.add('textInput');
        if (emptyInputs) {
            newInput.value = ''; // Leeres Textfeld
        } else {
            newInput.placeholder = ''; // Platzhalter für Textfeld
        }
        inputFieldContainer.appendChild(newInput);

        // Neue Löschtaste für das Textfeld
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = removeInputField;
        inputFieldContainer.appendChild(deleteButton);

        columnContainer.appendChild(inputFieldContainer);
    }

    // Neue Taste zum Hinzufügen von Textfeldern
    var addInputButton = document.createElement('button');
    addInputButton.textContent = 'Textfeld hinzufügen';
    addInputButton.classList.add('addInputButton');
    addInputButton.onclick = addInput;
    columnContainer.appendChild(addInputButton);

    return columnContainer;
}

// Funktion zum Entfernen einer Spalte
function removeColumn(event) {
    var targetColumnContainer = event.target.parentNode; // Container der Spalte und der Löschtaste
    targetColumnContainer.parentNode.removeChild(targetColumnContainer); // Entfernt den Container der Spalte
    // Entferne zugehörige Textfelder und Quadrate
    textInputs.forEach(function(square, input) {
        if (input.closest('.columnContainer') === targetColumnContainer) {
            square.parentNode.removeChild(square);
            textInputs.delete(input);
        }
    });
}

// Funktion zum Hinzufügen eines neuen leeren Textfelds
function addInput() {
    var inputFieldContainer = document.createElement('div');
    inputFieldContainer.classList.add('textInputContainer');

    var newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.classList.add('textInput');
    newInput.value = ''; // Leeres Textfeld
    inputFieldContainer.appendChild(newInput);

    // Neue Löschtaste für das Textfeld
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('deleteButton');
    deleteButton.onclick = removeInputField;
    inputFieldContainer.appendChild(deleteButton);

    // Fügt das neue Textfeld vor der Taste ein
    this.parentNode.insertBefore(inputFieldContainer, this);

    addSquare(newInput); // Quadrat hinzufügen
}

// Funktion zum Entfernen eines Textfelds
function removeInputField(event) {
    var targetInputFieldContainer = event.target.parentNode; // Container des Textfelds und der Löschtaste
    targetInputFieldContainer.parentNode.removeChild(targetInputFieldContainer); // Entfernt den Container des Textfelds
    // Entferne zugehöriges Quadrat
    var input = targetInputFieldContainer.querySelector('.textInput');
    var square = textInputs.get(input);
    square.parentNode.removeChild(square);
    textInputs.delete(input);
}

// Funktion zum Generieren einer zufälligen Hexadezimalfarbe
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function assignNamesToSquares() {
    var squareContainers = document.querySelectorAll('.square');
    var inputs = document.querySelectorAll('.textInput');
    var inputsArray = Array.from(inputs);
    var assignedNames = new Map(); // Map zur Zuordnung von Namen zu Quadraten

    squareContainers.forEach(function(square) {
        var color = window.getComputedStyle(square).backgroundColor;
        var matchingInputs = inputsArray.filter(function(input) {
            var columnContainer = input.closest('.columnContainer');
            var columnColor = window.getComputedStyle(columnContainer).backgroundColor;
            return columnColor === color;
        });

        matchingInputs = shuffleArray(matchingInputs); // Zufällige Reihenfolge der passenden Eingabefelder

        var matchingInput = matchingInputs.find(function(input) {
            return !assignedNames.has(input.value); // Findet das erste nicht zugewiesene Eingabefeld
        });

        if (matchingInput) {
            assignedNames.set(matchingInput.value, square); // Fügt den Namen zum Quadrat hinzu
            square.textContent = matchingInput.value; // Setzt den Namen im Quadrat
        }
    });
}

function suport() {
    alert("Die einzelnen Kriteriengruppen dienen dazu die Klasse in Kriterien zu unterteilen. Für jede zusätzliche Kriteriengruppe wird die Taste 'Kriteriengruppe hinzufügen' benutzt und entsprechend die SuS eingegeben. Zum Beispiel werden in die 1. Kriteriengruppe alle Mädchennamen eingefügt und in die 2. dann alle Jungennamen. Die Namen werden zufällig den Quadraten mit den gleichen Farben zugeordnet, wie die Farbe der Kriteriengruppe, in der die Namen stehen, wenn Sie die Taste 'Namen zuordnen' verwenden. Die Kriteriengruppen können auch für die Unterteilung von Wohnorten, Alter oder anderes dienen. Es können beliebig viele Kriteriengruppen erstellt werden. Durch das Bewegen der Quadrate, kann ein beliebige Sitzordnung erstellt werden. Bei weiteren Fragen senden Sie mir eine Mail unter: application4classroom@gmail.com");
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

// Funktion zum Mischen eines Arrays
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Funktion zum Ein- und Ausblenden von Spalten
function toggleColumns() {
    var columnContainers = document.querySelectorAll('.columnContainer');
    columnContainers.forEach(function(columnContainer) {
        columnContainer.classList.toggle('hidden'); // Fügt oder entfernt die Klasse 'hidden' für das Ein- und Ausblenden
    });
}

// Event Listener für das Ein- und Ausblenden von Spalten
document.getElementById('toggleColumnsButton').addEventListener('click', toggleColumns);

// Event Listener für das Hinzufügen einer neuen Spalte
document.getElementById('addColumn').addEventListener('click', addColumn);

// Event Listener für das Zufällige Zuordnen der Namen zu den Quadraten
document.getElementById('assignNamesButton').addEventListener('click', assignNamesToSquares);