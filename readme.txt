This webpage, named Cartoonopia, will offer the following features:

1. Anime Character Search Function:
Users can enter the name of the character they wish to search for in the search bar, with search results updating in real time as they type. If a user enters non-alphabetic characters, the search results will display "Please do not enter symbols or numbers." If the input does not match any search results, "No Characters Found" will be shown.

2. Anime Character Attribute Filter:
This filter will work in conjunction with the search function. The webpage's JavaScript code places thumb listeners at appropriate locations, so when users slide the filter's two thumbs, the search results will be limited to the selected attribute range. This functionality is mainly implemented by the addCharacterToTable() method, while the two thumbs range selector is implemented by RangeSelector.js

Note: The search functionality is primarily controlled by the search() method in JavaScript, which displays all characters when called with an empty argument. I invoke the search() method with an empty argument once the JSON file is fully loaded, meaning that upon page load, the search results section will display all characters without being limited by the attribute filter.

3. Character Attribute Comparison:
This feature becomes available when search results are selected. Users can only choose two characters to compare. When two characters are selected, the lower half of the webpage will display the comparison results in real-time. Attributes that are superior to the opponent's will be marked with a built-in checkmark icon using innerHTML, and the background box of the winning character will turn green. If the attributes are equal, checkmark will be randomly assigned. When only one character is selected, their attributes will also be displayed in real-time without comparison results.
Here, when users select a character, the character's name is added to the selectedCharacters array, and the updateSelection() method dictates that users can select a maximum of two characters at a time.

4. Previous Comparison:
This feature will be able to save previously selected character pairs (two characters) for comparison, with a maximum of eight pairs displayed. Here, previous comparison pairs are saved in the comparisonList array. Since there's no limit set on the number of entries for this array, I've specified in the updateSelection() method that the currently selected two characters will only be added to the comparisonList if they differ from the last eight pairs (the most recently added pairs) in the array. This is to avoid repeating character pairs in the comparison boxes. The automatic generation of comparison boxes is mainly achieved through the handleBoxClick() method. It's preset that each row contains two comparison boxes, and the current selected box's index is calculated using Math methods to determine which row the characters should be placed in.

Regarding the webpage's styling:

1. To ensure all search results can be displayed at once, a scrollbar has been added to the right side of the search results section, with the same applied to the Previous Comparisons section.
2. The search results have been given a grey-white background to make the text easier to read without blending into the background image.

For Screenshot Preview please see snapshots folder.

PS: This is a campus project, please do not use this for your assignment submission or you may face a plagiarism investigation.
