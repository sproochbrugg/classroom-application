var texts = [];


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

    this.parentNode.insertBefore(inputFieldContainer, this); // Fügt das neue Textfeld vor der Taste ein
    
    addSquare(newInput); // Quadrat hinzufügen
}

// Funktion zum Hinzufügen des Quadrats
function addSquare(input) {
    var columnContainer = input.closest('.columnContainer');
    var columnColor = window.getComputedStyle(columnContainer).backgroundColor;

    var square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = columnColor; // Setzt die Hintergrundfarbe des Quadrats

    // Fügt das Quadrat dem squareContainer hinzu
    var squareContainer = document.getElementById('squareContainer');
    squareContainer.appendChild(square);

}


// Funktion zum Hinzufügen einer neuen Spalte mit leeren Textfeldern und farbigem Quadrat
function addColumn() {
    var gt = document.getElementById("gt");
    var columnContainers = document.querySelectorAll('.columnContainer');

    // Löschen aller vorhandenen Quadrate
    var groupContainers = document.querySelectorAll('.groupContainer');
    groupContainers.forEach(function(container) {
        gt.removeChild(container);
    });

    var columnContainer = createColumnContainer(true); // Leere Textfelder erstellen
    columnContainer.style.backgroundColor = getRandomColor(); // Zufällige Hintergrundfarbe festlegen
    gt.appendChild(columnContainer);

    // Fügt farbige Quadrate für die beiden Textfelder am Anfang der Spalte hinzu
    var inputContainers = columnContainer.querySelectorAll('.textInputContainer');
    inputContainers.forEach(function(inputContainer) {
        var newInput = inputContainer.querySelector('.textInput');
        addSquare(newInput);
    });
}

// Initialisierung
document.getElementById('addColumn').addEventListener('click', addColumn);
document.getElementById('addMoreFields').addEventListener('click', addMoreFields);
enterTexts();

// Funktion zum Generieren einer zufälligen Hexadezimalfarbe
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
}



// Funktion zum Hinzufügen von Textfeldern zu einer Spalte
function addMoreFields() {
    var columnContainers = document.querySelectorAll('.columnContainer');
    columnContainers.forEach(function(columnContainer) {
        var inputFieldContainers = columnContainer.querySelectorAll('.textInputContainer');
        var numInputFields = inputFieldContainers.length;
        var lastInputFieldContainer = inputFieldContainers[numInputFields - 1];
        var newInputFieldContainer = lastInputFieldContainer.cloneNode(true);
        var newInput = newInputFieldContainer.querySelector('.textInput');
        newInput.value = ''; // Leeres Textfeld
        
        // Löschtasten entfernen
        var deleteButtons = newInputFieldContainer.querySelectorAll('.deleteButton');
        deleteButtons.forEach(function(button) {
            button.remove();
        });

        // Neue Löschtaste für das Textfeld
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = removeInputField;
        newInputFieldContainer.appendChild(deleteButton);

        columnContainer.appendChild(newInputFieldContainer);
    });
}


// Funktion zum Entfernen eines Textfelds
function removeInputField(event) {
    var targetInputFieldContainer = event.target.parentNode; // Container des Textfelds und der Löschtaste
    targetInputFieldContainer.parentNode.removeChild(targetInputFieldContainer); // Entfernt den Container des Textfelds
}

// Event Listener für das Hinzufügen einer neuen Spalte
document.getElementById('addColumn').addEventListener('click', addColumn);

// Event Listener für das Hinzufügen weiterer Textfelder zu einer Spalte
document.getElementById('addMoreFields').addEventListener('click', addMoreFields);

// Initialisierung
enterTexts(); // Um die Namen und die Gruppen sofort anzuzeigen