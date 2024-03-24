// listening to searches
document.getElementById("search-input").addEventListener("input", processSearch);
function getJsonObject(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              if (success) success(JSON.parse(xhr.responseText));
          } else {
              if (error) error(xhr);
          }
      }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

characterList = []; // character list container
getJsonObject('data.json',
    function(data) {
        characterList = data.Characters; // store the character list into characterList
        search('');// Show all characters(up to 6) once screen loaded
        updateCharacterDisplay();
        console.log(characterList); // print it into console (developer tools)
        console.log(characterList[0]); // print the first character object to the console 
        // here you can call methods to load or refresh the page 
        // loadCharacters() or refreshPage()
    },
    function(xhr) { console.error(xhr); }
);


function processSearch(event) {
  var searchValue = event.target.value;
  console.log(searchValue);
  console.log(selectedCharacters);
  console.log(comparisonList);
  search(searchValue);
}

function clearTable() {
  // Clears all rows except the table header
  const table = document.getElementById('character-table');
  while (table.rows.length > 1) {
      table.deleteRow(1);
  }
}

function displayMessage(message) {
  clearTable();
  const table = document.getElementById('character-table');
  const row = table.insertRow();
  const cell = row.insertCell();
  cell.setAttribute('colspan', 9);
  cell.textContent = message;
}

var selectedCharacters = [];
var comparisonList = [];

function updateComparisonBoxes() {
  // Get all comparison boxes
  var comparisonBoxes = document.querySelectorAll('.comparisonBox');

  // Empty the contents of all comparison boxes
  comparisonBoxes.forEach(box => {
    box.innerHTML = ''; 
  });

  // Check if the length of the comparisonList array is 2
  if (comparisonList.length === 2) {
    comparisonBoxes.forEach(box => {
      box.innerHTML = ''; 
    });
    comparisonBoxes[0].innerHTML = comparisonList[0];
    comparisonBoxes[1].innerHTML = comparisonList[1];
  } else {
    var endIndex = comparisonList.length; 
    var startIndex = Math.max(endIndex - comparisonBoxes.length, 0); 

    // Fill the comparison box in reverse from endIndex to startIndex.
    for (let i = endIndex - 1, boxIndex = 0; i >= startIndex; i--, boxIndex++) {
      comparisonBoxes[boxIndex].innerHTML = comparisonList[i];
    }
  }
}




const BOXES_PER_ROW = 2;


document.querySelectorAll('.comparisonBox').forEach((box, index) => {
  box.addEventListener('click', function() {
    handleBoxClick(index); 
  });
});

function handleBoxClick(index) {

  const rowIndex = Math.floor(index / BOXES_PER_ROW) * BOXES_PER_ROW;
  console.log(rowIndex);
  let selectedNames = [];
  if (rowIndex === 0) {
    // When rowIndex is 0, the names of the two characters at the end of the comparisonList are selected.
    selectedNames = comparisonList.slice(-2);
  } else if (rowIndex === 2) {
    // When rowIndex is 2, the names of the penultimate three and four characters of the comparisonList are selected.
    selectedNames = comparisonList.slice(-4, -2);
  } else if (rowIndex === 4) {
    // So forth...
    selectedNames = comparisonList.slice(-6, -4);
  } else if (rowIndex === 6) {
    selectedNames = comparisonList.slice(-8, -6);
  } else if (rowIndex === 8) {
    selectedNames = comparisonList.slice(-10, -8);
  } else if (rowIndex === 10) {
    selectedNames = comparisonList.slice(-12, -10);
  } else if (rowIndex === 12) {
    selectedNames = comparisonList.slice(-14, -12);
  } else if (rowIndex === 14) {
    selectedNames = comparisonList.slice(-16, -14);
  }

  // Determine if selectedNames and selectedCharacters are the same
  const isDifferent = selectedNames.length !== selectedCharacters.length || 
                      selectedNames.some(name => !selectedCharacters.includes(name)) ||
                      selectedCharacters.some(name => !selectedNames.includes(name));

  if (isDifferent) {
    selectedCharacters.length = 0;
    selectedCharacters.push(...selectedNames);
  } else {
    // If they are the same, the selectedCharacters are simply cleared, i.e. when the user repeatedly clicks on the same set of characters in the comparison box, 
    // the previously selected characters will be deselected in the search results
    selectedCharacters.length = 0;
  }
  updateRowDisplay();
  updateCharacterDisplay();
  console.log(selectedCharacters);
}



function updateSelection(name) {
  const index = selectedCharacters.indexOf(name);

  if (index > -1) {
    selectedCharacters.splice(index, 1);
  } else {
    if (selectedCharacters.length < 2) { //put newly selected characters into selectedCharacters only when the number of selected characters is less than two 
      selectedCharacters.push(name);
      if (selectedCharacters.length === 2) {
        // When the number of characters in selectedCharacters reaches two, check if they are duplicates of the last 16 elements already in the comparisonList.
        const isDifferentFromLast =
          ((selectedCharacters[0] !== comparisonList[comparisonList.length - 1] ||
           selectedCharacters[1] !== comparisonList[comparisonList.length - 2]) &&
          (selectedCharacters[0] !== comparisonList[comparisonList.length - 2] ||
           selectedCharacters[1] !== comparisonList[comparisonList.length - 1])) &&
           ((selectedCharacters[0] !== comparisonList[comparisonList.length - 3] ||
            selectedCharacters[1] !== comparisonList[comparisonList.length - 4]) &&
           (selectedCharacters[0] !== comparisonList[comparisonList.length - 4] ||
            selectedCharacters[1] !== comparisonList[comparisonList.length - 3])) &&
           ((selectedCharacters[0] !== comparisonList[comparisonList.length - 5] ||
            selectedCharacters[1] !== comparisonList[comparisonList.length - 6]) &&
           (selectedCharacters[0] !== comparisonList[comparisonList.length - 6] ||
            selectedCharacters[1] !== comparisonList[comparisonList.length - 5])) &&
            ((selectedCharacters[0] !== comparisonList[comparisonList.length - 7] ||
             selectedCharacters[1] !== comparisonList[comparisonList.length - 8]) &&
            (selectedCharacters[0] !== comparisonList[comparisonList.length - 8] ||
             selectedCharacters[1] !== comparisonList[comparisonList.length - 7])) &&
             ((selectedCharacters[0] !== comparisonList[comparisonList.length - 9] ||
              selectedCharacters[1] !== comparisonList[comparisonList.length - 10]) &&
             (selectedCharacters[0] !== comparisonList[comparisonList.length - 10] ||
              selectedCharacters[1] !== comparisonList[comparisonList.length - 9])) &&
              ((selectedCharacters[0] !== comparisonList[comparisonList.length - 11] ||
               selectedCharacters[1] !== comparisonList[comparisonList.length - 12]) &&
              (selectedCharacters[0] !== comparisonList[comparisonList.length - 12] ||
               selectedCharacters[1] !== comparisonList[comparisonList.length - 11])) &&
               ((selectedCharacters[0] !== comparisonList[comparisonList.length - 13] ||
                selectedCharacters[1] !== comparisonList[comparisonList.length - 14]) &&
               (selectedCharacters[0] !== comparisonList[comparisonList.length - 14] ||
                selectedCharacters[1] !== comparisonList[comparisonList.length - 13])) &&
                ((selectedCharacters[0] !== comparisonList[comparisonList.length - 15] ||
                 selectedCharacters[1] !== comparisonList[comparisonList.length - 16]) &&
                (selectedCharacters[0] !== comparisonList[comparisonList.length - 16] ||
                 selectedCharacters[1] !== comparisonList[comparisonList.length - 15]));
      
        if (isDifferentFromLast) {
          comparisonList.push(...selectedCharacters);
        }
      }
    } 
  }
  updateComparisonBoxes();
  updateCharacterDisplay();
}




function updateRowDisplay() {
  const rows = document.querySelectorAll('#character-table tr:not(:first-child)');
  rows.forEach(row => {// Tag selected characters by data-name
    const name = row.getAttribute('data-name');
    if (selectedCharacters.includes(name)) {
      row.cells[8].innerHTML = '<span class="checkmark">&#9745;</span>';
      row.classList.add('selected');
    } else {
      row.cells[8].textContent = ' ';
      row.classList.remove('selected');
    }
  });
}


function addCharacterToTable(character, strengthRange, speedRange, skillRange, fearFRange, powerRange, intelligenceRange, wealthRange) {
  if ((strengthRange && (character.strength < strengthRange[0] || character.strength > strengthRange[1])) ||
      (speedRange && (character.speed < speedRange[0] || character.speed > speedRange[1])) ||
      (skillRange && (character.skill < skillRange[0] || character.skill > skillRange[1])) ||
      (fearFRange && (character.fear_factor < fearFRange[0] || character.fear_factor > fearFRange[1])) ||
      (powerRange && (character.power < powerRange[0] || character.power > powerRange[1])) ||
      (intelligenceRange && (character.intelligence < intelligenceRange[0] || character.intelligence > intelligenceRange[1])) ||
      (wealthRange && (character.wealth < wealthRange[0] || character.wealth > wealthRange[1]))) {
      return;
}

  const table = document.getElementById('character-table');
  if (table.rows.length <= 15) {// Able to show all 16 characters
      const row = table.insertRow();
      row.setAttribute('data-name', character.name);
      row.innerHTML = `
          <td class="character-td-name">${character.name}</td>
          <td class="character-td">${character.strength}</td>
          <td class="character-td">${character.speed}</td>
          <td class="character-td">${character.skill}</td>
          <td class="character-td">${character.fear_factor}</td>
          <td class="character-td">${character.power}</td>
          <td class="character-td">${character.intelligence}</td>
          <td class="character-td">${character.wealth}</td>
          <td class="selected-td"></td>`;
          row.onclick = function() {
            const characterName = this.getAttribute('data-name');
          
            updateSelection(characterName);
          
            updateRowDisplay();
          };
  }
}


function updateCharacterDisplay() {
  const characterNames = document.querySelectorAll('.character-name');
  characterNames[0].textContent = selectedCharacters.length > 0 ? selectedCharacters[0] : "Unknown";
  characterNames[1].textContent = selectedCharacters.length > 1 ? selectedCharacters[1] : "Unknown";
  
  const characterDivs = document.querySelectorAll('.character');
  updateCharacterDiv(characterDivs[0], selectedCharacters.length > 0 ? selectedCharacters[0] : null);
  updateCharacterDiv(characterDivs[1], selectedCharacters.length > 1 ? selectedCharacters[1] : null);


  const versusDiv = document.querySelector('.versus');
  versusDiv.textContent = selectedCharacters.length === 2 ? 'VS' : '';

    // Get the feature containers
const leftFeatureContainer = document.querySelector('.featureContainer.left');
const rightFeatureContainer = document.querySelector('.featureContainer.right');

// Clear previous contents
leftFeatureContainer.innerHTML = '';
rightFeatureContainer.innerHTML = '';

// Compare attributes and update the display only if two characters are selected
if (selectedCharacters.length === 2) {
  const char1Data = characterList.find(c => c.name === selectedCharacters[0]);
  const char2Data = characterList.find(c => c.name === selectedCharacters[1]);

  if (char1Data && char2Data) {
    const attributes = ["strength", "speed", "skill", "fear_factor", "power", "intelligence", "wealth"];
    let leftWins = 0;
    let rightWins = 0;

    attributes.forEach((attribute, index) => {
      const leftP = document.createElement('p');
      const rightP = document.createElement('p');

      if (char1Data[attribute] > char2Data[attribute]) {
        leftP.innerHTML = '&#9745;';
        rightP.innerHTML = '&nbsp;';
        leftWins++;
      } else if (char1Data[attribute] < char2Data[attribute]) {
        rightP.innerHTML = '&#9745;';
        leftP.innerHTML = '&nbsp;';
        rightWins++;
      } else { // When attributes are equal
        // Randomly assign win to left or right when attributes are equal
        if (Math.random() < 0.5) {
          leftP.innerHTML = '&#9745;';
          rightP.innerHTML = '&nbsp;';
          leftWins++;
        } else {
          rightP.innerHTML = '&#9745;';
          leftP.innerHTML = '&nbsp;';
          rightWins++;
        }
      }

      leftFeatureContainer.appendChild(leftP);
      rightFeatureContainer.appendChild(rightP);
    });

    // Set the background colors based on comparison
    leftFeatureContainer.style.backgroundColor = leftWins > rightWins ? '#00550B' : '#540000';
    rightFeatureContainer.style.backgroundColor = rightWins > leftWins ? '#00550B' : '#540000';
    
  }
} else {
  leftFeatureContainer.style.backgroundColor = '#1F1F1F';
  rightFeatureContainer.style.backgroundColor = '#1F1F1F';
}
}



function updateCharacterDiv(div, characterName) {
  div.innerHTML = ''; 
  if (characterName) {
    const character = characterList.find(c => c.name === characterName);// Find all attributes of a character from json
    if (character) {
      const img = document.createElement('img');
      img.src = character.image_url;
      div.appendChild(img);
    }
  } else {
    div.textContent = '?';// If no characters found, show question mark
  }
}




function search(searchValue, strengthRange, speedRange, skillRange, fearFRange, powerRange, intelligenceRange, wealthRange) {
  clearTable();
// Search function
  const trimmedSearchValue = searchValue.trim();
  if (/[^a-zA-Z ]/.test(trimmedSearchValue)) {
      displayMessage("Please do not enter symbols or numbers");
      return;
  }
  const filteredCharacters = characterList.filter(character => {
      const isMatch = Object.values(character).some(value =>
          typeof value === "string" && value.toLowerCase().includes(trimmedSearchValue.toLowerCase())
      );

      if (!isMatch) return false;

      if (strengthRange && (character.strength < strengthRange[0] || character.strength > strengthRange[1])) {
          return false;
      }
      if (speedRange && (character.speed < speedRange[0] || character.speed > speedRange[1])) {
          return false;
      }
      if (skillRange && (character.skill < skillRange[0] || character.skill > skillRange[1])) {
          return false;
      }
      if (fearFRange && (character.fear_factor < fearFRange[0] || character.fear_factor > fearFRange[1])) {
          return false;
      }
      if (powerRange && (character.power < powerRange[0] || character.power > powerRange[1])) {
          return false;
      }
      if (intelligenceRange && (character.intelligence < intelligenceRange[0] || character.intelligence > intelligenceRange[1])) {
          return false;
      }
      if (wealthRange && (character.wealth < wealthRange[0] || character.wealth > wealthRange[1])) {
          return false;
      }

      return true;
  });

  if (filteredCharacters.length === 0) {
      displayMessage("No Characters Found");
  } else {
      filteredCharacters.forEach(addCharacterToTable);
  }

  updateRowDisplay();
}


document.addEventListener('DOMContentLoaded', function() {
  search('');
});
document.getElementById('search-input').addEventListener('input', processSearch);



