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

// Funktion zum Zufälligen Zuordnen der Namen zu den Quadraten basierend auf den Farben
function assignNamesToSquares() {
    var squareContainers = document.querySelectorAll('.square');
    var inputs = document.querySelectorAll('.textInput');
    var inputsArray = Array.from(inputs);
    var shuffledInputs = shuffleArray(inputsArray);
    var assignedNames = [];

    squareContainers.forEach(function(square) {
        var color = window.getComputedStyle(square).backgroundColor;
        var matchingInputs = shuffledInputs.filter(function(input) {
            var columnContainer = input.closest('.columnContainer');
            var columnColor = window.getComputedStyle(columnContainer).backgroundColor;
            return columnColor === color;
        });

        var matchingInput = null;
        for (var i = 0; i < matchingInputs.length; i++) {
            if (!assignedNames.includes(matchingInputs[i].value)) {
                matchingInput = matchingInputs[i];
                assignedNames.push(matchingInput.value);
                break;
            }
        }

        if (matchingInput) {
            var assignedSquare = textInputs.get(matchingInput);
            assignedSquare.textContent = matchingInput.value;
        }
    });
}



// Funktion zum Mischen eines Arrays
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Event Listener für das Hinzufügen einer neuen Spalte
document.getElementById('addColumn').addEventListener('click', addColumn);

// Event Listener für das Zufällige Zuordnen der Namen zu den Quadraten
document.getElementById('assignNamesButton').addEventListener('click', assignNamesToSquares);
