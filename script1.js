var texts = [];

// Funktion zum Zufälligen Zuordnen von Texten zu Quadraten
function assignRandomTexts() {
    var gt = document.getElementById("gt");

    // Löschen aller vorhandenen Quadrate
    var groupContainers = document.querySelectorAll('.groupContainer');
    groupContainers.forEach(function(container) {
        gt.removeChild(container);
    });

    var groupedTexts = groupTexts(texts); // Namen in Gruppen unterteilen

    // Farben für die Gruppen festlegen
    var colors = generateRandomColors(groupedTexts.length);

    // Namen in den entsprechenden Textfeldern anzeigen und einfärben
    for (var i = 0; i < groupedTexts.length; i++) {
        var groupContainer = document.createElement('div');
        groupContainer.classList.add('groupContainer');
        groupContainer.style.backgroundColor = colors[i]; // Hintergrundfarbe der Gruppe

        // Namen der Gruppe anzeigen und einfärben
        for (var j = 0; j < groupedTexts[i].length; j++) {
            var nameDiv = document.createElement('div');
            nameDiv.classList.add('square');
            nameDiv.textContent = groupedTexts[i][j]; // Namen aus der entsprechenden Gruppe nehmen
            groupContainer.appendChild(nameDiv);
        }

        gt.appendChild(groupContainer);
    }
}

// Funktion zum Eingeben von Texten und Gruppieren
function enterTexts() {
    var inputFields = document.querySelectorAll('.textInput');
    texts = [];
    inputFields.forEach(function(input) {
        texts.push(input.value);
    });

    // Mische die Namen in jeder Kriteriengruppe
    var columnContainers = document.querySelectorAll('.columnContainer');
    columnContainers.forEach(function(columnContainer) {
        var inputFields = columnContainer.querySelectorAll('.textInput');
        var names = [];
        inputFields.forEach(function(input) {
            names.push(input.value);
        });
        shuffleArray(names);
        inputFields.forEach(function(input, index) {
            input.value = names[index];
        });
    });

    // Mische die Kriteriengruppen untereinander
    var columnsContainer = document.getElementById('gt');
    var columns = Array.from(columnsContainer.querySelectorAll('.columnContainer'));
    shuffleArray(columns);
    columns.forEach(function(column) {
        columnsContainer.appendChild(column);
    });

    assignRandomTexts(); // Aufruf der Funktion zum Zufälligen Zuordnen von Texten
}

// Funktion zum Gruppieren der Texte
function groupTexts(texts) {
    var groupSize = parseInt(document.getElementById('groupSize').value); // Größe der Gruppen
    var totalGroups = Math.ceil(texts.length / groupSize);
    var groupedTexts = [];

    for (var i = 0; i < totalGroups; i++) {
        var group = [];
        for (var j = i; j < texts.length; j += totalGroups) {
            group.push(texts[j]);
        }
        groupedTexts.push(group);
    }

    return groupedTexts;
}



// Funktion zum Generieren von zufälligen Farben
function generateRandomColors(numColors) {
    var colors = [];
    for (var i = 0; i < numColors; i++) {
        var color = '#';
        for (var j = 0; j < 6; j++) {
            color += Math.floor(Math.random() * 16).toString(16);
        }
        colors.push(color);
    }
    return colors;
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

    this.parentNode.insertBefore(inputFieldContainer, this); // Fügt das neue Textfeld vor der Taste ein
}


// Funktion zum Mischen eines Arrays (Fisher-Yates Shuffle)
function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // Solange noch Elemente vorhanden sind
    while (currentIndex !== 0) {

        // Zufälligen Index auswählen
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Aktuelles Element mit dem Element an der zufälligen Position tauschen
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Funktion zum Hinzufügen einer neuen Spalte mit leeren Textfeldern
function addColumn() {
    var gt = document.getElementById("gt");
    var columnContainers = document.querySelectorAll('.columnContainer');

    // Löschen aller vorhandenen Quadrate
    var groupContainers = document.querySelectorAll('.groupContainer');
    groupContainers.forEach(function(container) {
        gt.removeChild(container);
    });

    var columnContainer = createColumnContainer(true); // Leere Textfelder erstellen
    gt.appendChild(columnContainer);
}



// Funktion zum Erstellen eines Spaltencontainers mit Löschtaste
function createColumnContainer(emptyInputs) {
    var columnContainer = document.createElement('div');
    columnContainer.classList.add('columnContainer');

    // Neue Löschtaste für die Spalte
    var deleteColumnButton = document.createElement('button');
    deleteColumnButton.textContent = 'Kriteriengruppe löschen';
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

// Event Listener für das Ändern der Gruppengröße
document.getElementById('groupSize').addEventListener('change', enterTexts);

// Event Listener für das Klicken auf "Namen verwenden"
document.getElementById('useNamesButton').addEventListener('click', function() {
    texts = []; // Leere das Array mit den Namen
    assignRandomTexts(); // Rufe assignRandomTexts() auf, um die Quadrate mit Hintergrundfarben zu löschen und neue Namen anzuzeigen
});


// Initialisierung
enterTexts(); // Um die Namen und die Gruppen sofort anzuzeigen

