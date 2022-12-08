// Your mini-app should take user input for:
// a category name, a category icon, and a category colour.

// When the user clicks ‘Next’, it should display the recently added category, with a ‘Back’ button.

// When the user clicks ‘Back’, the newly created category should now be added back to the list and displayed with the other categories.

// When the user clicks ‘Delete’, symbolized as the "🗑️" icon,  the category should be removed from the list and localStorage.

// When the user clicks "Edit", symbolized as the "✏️" icon, the category should be editable using the same input fields as when the category was created.

//<=== Initials ===>

//<-- Elements -->

const form = document.querySelector("#form");
const categoryNameInput = document.querySelector("#category-name");
const iconSelector = document.querySelector("#icon-selector");
const colorPicker = document.querySelector("#color-picker");
const categoriesList = document.querySelector("#categories");

//<-- Variables -->

const colorPalette = [
	{ name: "Coral", color: "#FF8370" },
	{ name: "Blue Green", color: "#00B1B0" },
	{ name: "Freesia", color: "#FEC84D" },
	{ name: "Fuschia", color: "#E42256" },
	{ name: "Lilac", color: "#BD97CB" },
	{ name: "Gold", color: "#FBC740" },
];

const iconPalette = [
	{ name: "briefcase", value: "💼" },
	{ name: "moneybag", value: "💰" },
	{ name: "greenbook", value: "📗" },
	{ name: "bluebook", value: "📘" },
	{ name: "orangebook", value: "📙" },
	{ name: "redbook", value: "📕" },
];

//<-- Helper Functions -->

const getColor = (colorName) => colorPalette.find((color) => color.name === colorName).color;
const getIcon = (iconName) => iconPalette.find((icon) => icon.name === iconName).value;

//create a category object for the category list
const createCategory = (categoryName, icon, color) => {};

//update the localStorage object with all the categories
const updateLocalStorage = (categories) => {};

//get the categories from localStorage
const getCategories = () => {};

//<=== Functions ===>

// Category name should be a string of 4-20 characters.

const checkCategoryName = (categoryName) =>
	categoryName.length >= 4 && categoryName.length <= 20
		? true
		: (alert("Category name must be between 4 and 20 characters"), false);

// Function to populate the icon selector with the icons from the iconPalette

const populateIconList = () =>
	iconPalette.map((icon) => {
		const option = document.createElement("option");
		option.value = icon.value;
		option.textContent = icon.value;
		iconSelector.appendChild(option);
	});

// Function to populate the color picker with the colors from the colorPalette

const populateColorList = () =>
	colorPalette.map((color) => {
		const option = document.createElement("option");
		option.value = color.color;
		option.textContent = color.name;
		colorPicker.appendChild(option);
	});

// When the user clicks "Add", the category should be added to a list of categories.

const addCategory = () => {};

// <=== Event Listeners ===>

form.addEventListener("submit", (e) => {
	e.preventDefault();
	addCategory();
});

// <=== Program ===>

populateIconList();
populateColorList();
