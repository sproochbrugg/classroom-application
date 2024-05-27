var texts = [];

function saveData() {
    document.getElementById('saveModal').style.display = "block";
}

function confirmSave() {
    var saveName = document.getElementById('saveName').value;
    if (saveName) {
        var columns = [];
        var columnContainers = document.querySelectorAll('.columnContainer');
        columnContainers.forEach(function(columnContainer) {
            var inputs = columnContainer.querySelectorAll('.textInput');
            var columnData = [];
            inputs.forEach(function(input) {
                columnData.push(input.value);
            });
            columns.push(columnData);
        });
        localStorage.setItem(saveName, JSON.stringify(columns));
        alert("Liste wurden gespeichert!");
        closeSaveModal();
    } else {
        alert("Bitte geben Sie den Klassennamen ein.");
    }
}

function loadData() {
    document.getElementById('loadModal').style.display = "block";
    var loadSelect = document.getElementById('loadSelect');
    loadSelect.innerHTML = ''; // Clear previous options

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        loadSelect.appendChild(option);
    }
}

function confirmLoad() {
    var loadSelect = document.getElementById('loadSelect');
    var selectedSave = loadSelect.value;
    if (selectedSave) {
        var columns = JSON.parse(localStorage.getItem(selectedSave));
        if (columns) {
            var gt = document.getElementById('gt');
            gt.innerHTML = ''; // Lösche alle bestehenden Spalten
            columns.forEach(function(columnData) {
                var columnContainer = createColumnContainer(false);
                var inputs = columnContainer.querySelectorAll('.textInput');
                columnData.forEach(function(text, index) {
                    if (inputs[index]) {
                        inputs[index].value = text;
                    } else {
                        var inputFieldContainer = document.createElement('div');
                        inputFieldContainer.classList.add('textInputContainer');

                        var newInput = document.createElement('input');
                        newInput.type = 'text';
                        newInput.classList.add('textInput');
                        newInput.value = text;

                        var deleteButton = document.createElement('button');
                        deleteButton.textContent = 'X';
                        deleteButton.classList.add('deleteButton');
                        deleteButton.onclick = removeInputField;

                        inputFieldContainer.appendChild(newInput);
                        inputFieldContainer.appendChild(deleteButton);

                        columnContainer.insertBefore(inputFieldContainer, columnContainer.lastChild);
                    }
                });
                gt.appendChild(columnContainer);
            });
            closeLoadModal();
        }
    } else {
        alert("Bitte wählen Sie eine Klasse zum Laden aus.");
    }
}


function closeLoadModal() {
    document.getElementById('loadModal').style.display = "none";
}

// Funktion zum Anzeigen aller Speicherstände
function showAllSaves() {
    document.getElementById('allSavesModal').style.display = "block";
    var savesList = document.getElementById('savesList');
    savesList.innerHTML = ''; // Clear previous list

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var li = document.createElement('li');
        li.textContent = key;

        // Löschbutton für jeden Speicherstand
        var deleteButton = document.createElement('span');
        deleteButton.textContent = 'löschen';
        deleteButton.classList.add('deleteSaveButton');
        deleteButton.setAttribute('data-key', key); // Speicherstand Schlüssel als Attribut setzen
        deleteButton.onclick = function(event) {
            deleteSave(event.target.getAttribute('data-key')); // Korrektes Schlüsselattribut holen und löschen
        };

        li.appendChild(deleteButton);
        savesList.appendChild(li);
    }
}

// Funktion zum Löschen eines Speicherstands
function deleteSave(key) {
    if (confirm('Sind Sie sicher, dass Sie diese Klasse löschen möchten?')) {
        localStorage.removeItem(key);
        showAllSaves(); // Refresh the list after deletion
    }
}

// Funktion zum Schließen des Modals für alle Speicherstände
function closeAllSavesModal() {
    document.getElementById('allSavesModal').style.display = "none";
}




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

    // Mische die Namen in jeder Spalte
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

    // Mische die Spalten
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



// Funktion zum Erstellen eines Spaltencontainers mit oder ohne Platzhaltern
function createColumnContainer(emptyInputs) {
    var columnContainer = document.createElement('div');
    columnContainer.classList.add('columnContainer');

    var deleteColumnButton = document.createElement('button');
    deleteColumnButton.textContent = 'Spalte entfernen';
    deleteColumnButton.classList.add('deleteButton');
    deleteColumnButton.onclick = removeColumn;
    columnContainer.appendChild(deleteColumnButton);

    for (var i = 0; i < 2; i++) {
        var inputFieldContainer = document.createElement('div');
        inputFieldContainer.classList.add('textInputContainer');
        var newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.classList.add('textInput');
        if (emptyInputs) {
            newInput.value = '';
        } else {
            newInput.placeholder = '';
        }
        inputFieldContainer.appendChild(newInput);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = removeInputField;
        inputFieldContainer.appendChild(deleteButton);

        columnContainer.appendChild(inputFieldContainer);
    }

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

function suport() {
    alert("Die einzelnen Kriteriengruppen dienen dazu die Klasse in Kriterien zu unterteilen. Für jede zusätzliche Kriteriengruppe wird die Taste 'Kriteriengruppe hinzufügen' benutzt und entsprechend die SuS eingegeben. Zum Beispiel werden in die 1. Kriteriengruppe alle Mädchennamen eingefügt und in die 2. dann alle Jungennamen. Die Namen aus den jeweiligen Kriteriengruppen werden anschliessend mit der Taste 'Gruppen generieren' regelmässig auf die (z.B.2er) Gruppen verteilt. Die Gruppengrösse kann in dem Eingabefeld frei bestimmt werden. Die Kriteriengruppen können auch für die Unterteilung von Wohnorten, Alter oder anderes dienen. Es können beliebig viele Kriteriengruppen erstellt werden. Die Klassen können auch mit 'Klassen speicher' gespeichert werden und anschliessen wieder mit 'Klasse laden' geladen werden. Bei 'Alle Klassen anzeigen', können die Klassen gelöscht werden. Bei weiteren Fragen senden Sie mir eine Mail unter: application4classroom@gmail.com");
}

// Funktion zum Ein- und Ausblenden von Spalten
function toggleColumns() {
    var columnContainers = document.querySelectorAll('.columnContainer');
    columnContainers.forEach(function(columnContainer) {
        columnContainer.classList.toggle('hidden'); // Fügt oder entfernt die Klasse 'hidden' für das Ein- und Ausblenden
    });
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

// Event Listener für das Ein- und Ausblenden von Spalten
document.getElementById('toggleColumnsButton').addEventListener('click', toggleColumns);

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

function closeSaveModal() {
    document.getElementById('saveModal').style.display = "none";
}

function closeLoadModal() {
    document.getElementById('loadModal').style.display = "none";
}

// Event Listener für das Schließen des Speichern-Modals
document.getElementById('closeSaveModal').addEventListener('click', closeSaveModal);

// Event Listener für das Schließen des Laden-Modals
document.getElementById('closeLoadModal').addEventListener('click', closeLoadModal);


// Event Listener für das Speichern der Daten
document.getElementById('saveDataButton').addEventListener('click', saveData);

// Event Listener für das Laden der Daten
document.getElementById('loadDataButton').addEventListener('click', loadData);


// Initialisierung
enterTexts(); // Um die Namen und die Gruppen sofort anzuzeigen