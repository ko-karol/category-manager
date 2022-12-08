// Your mini-app should take user input for a category name, a category icon, and a category colour.
// Category name should be a string of 4-20 characters.
// Category icon should be an emoji from the emoji palette below.
// Category colour should be a colour from the colour palette below.
// When the user clicks "Add", the category should be added to a list of categories. And added to an object in localStorage.
// When the user clicks ‘Next’, it should display the recently added category name, icon and colour, with a ‘Back’ button.
// When the user clicks ‘Back’, the newly created category should now be added back to the list and displayed with the other categories.
// When the user clicks ‘Delete’, symbolized as the "🗑️" icon,  the category should be removed from the list and localStorage.
// When the user clicks "Edit", symbolized as the "✏️" icon, the category should be editable using the same input fields as when the category was created.

// Color palette: Coral #FF8370, Blue Green #00B1B0, Freesia #FEC84D, Fuschia #E42256, Lilac #BD97CB and Gold #FBC740
// Emoji palette: 💼 💰 📗 📘 📙 📕

// <=== DOM ===>

// <-- Elements -->
const form = document.querySelector(".form");
const categoryNameInput = document.querySelector("#category-name");
const iconSelector = document.querySelector("#icon-selector");
const colorPicker = document.querySelector("#color-picker");
const addButton = document.querySelector("#add");
const categoriesList = document.querySelector("#categories");

// <-- Templates -->

const categoryTemplate = document.querySelector("#preset-category");
const iconTemplate = document.querySelector("#preset-icon");
const colorTemplate = document.querySelector("#preset-color");

// <=== Functions ===>
