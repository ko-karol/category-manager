// Select the category list ul element, the form elements and define the color and icon options for categories.
const form = document.querySelector("#form");
const formNameInput = document.querySelector("#form-name-input");
const iconSelector = document.querySelector("#icon-selector");
const colorSelector = document.querySelector("#color-picker");
const categoryList = document.querySelector("#category-list");

const colorPalette = [
	{ name: "Coral", color: "#FF8370" },
	{ name: "Blue-green", color: "#00B1B0" },
	{ name: "Freesia", color: "#FEC84D" },
	{ name: "Fuschia", color: "#E42256" },
	{ name: "Lilac", color: "#BD97CB" },
	{ name: "Pinkish", color: "#FCC2D2" },
];

const iconPalette = [
	{ name: "briefcase", value: "💼" },
	{ name: "moneybag", value: "💰" },
	{ name: "greenbook", value: "📗" },
	{ name: "bluebook", value: "📘" },
	{ name: "orangebook", value: "📙" },
	{ name: "redbook", value: "📕" },
];

let categoryArray = [];
let incrementId = categoryArray.length || 0;

// <==== Functions ====>

// Helper function to set the category array in local storage
const setCategoryInLocalStorage = (category) => localStorage.setItem("categories", JSON.stringify(category));

// Helper to set the initial state of the form selectors
const initialState = (type, value, color) => {
	type.value = value;
	type.classList.add(color.toLowerCase());
};

// Helper to retrieve the category array from local storage and map each category using the createNewCategory function.
const localStorageHandler = (event) => {
	const categories = JSON.parse(localStorage.getItem("categories"));
	categories.map((category) => createNewCategory(category.name, category.icon, category.color));
};

// Helper to generate a new category using the template in the HTML. The category is created using the template, then the id, name, icon and edit/delete buttons are set.
const generateCategory = (id, categoryName, icon, color) => {
	const categoryTemplate = document.querySelector("#category-template").content.cloneNode(true);
	const newCategory = categoryTemplate.querySelector("li");
	const newCategoryName = categoryTemplate.querySelector("h2");
	const newCategoryIcon = categoryTemplate.querySelector("span");
	const newCategoryEdit = categoryTemplate.querySelector(".edit");
	const newCategoryDelete = categoryTemplate.querySelector(".delete");

	// Set the id, name, icon and edit/delete buttons for the new category.
	newCategory.id = id;
	newCategoryName.textContent = categoryName;
	newCategoryIcon.textContent = icon;
	newCategoryEdit.textContent = "✏️";
	newCategoryDelete.textContent = "🗑️";

	newCategoryIcon.classList.add(color.toLowerCase());

	// Add event listeners to the edit and delete buttons.
	// newCategoryEdit.addEventListener("click", editCategory);
	newCategoryDelete.addEventListener("click", deleteCategory);

	return newCategory;
};

// Function to create a new category using the template in generateCategory, then append it to the category list and push it to the category array.
function createNewCategory(categoryName, icon, color) {
	const categoryInfo = { id: incrementId, name: categoryName, icon: icon, color: color };
	const generatedCategory = generateCategory(incrementId++, categoryName, icon, color);
	categoryList.append(generatedCategory);
	categoryArray.push(categoryInfo);
}

// When the category is clicked, the category is displayed by itself with next and back buttons. //TODO: Add the ability to display the category's tasks etc.
//? const showCategory = (event) => {};
// When the edit button is clicked, the category is editable. //TODO: Add the ability to edit the category name, icon and color.
//? const editCategory = (event) => {};

// When the delete button is clicked, the category is deleted from the category list and the category array.
const deleteCategory = (event) => {
	const listItem = event.target.closest("li");
	const categoryIndex = categoryArray.findIndex((category) => category.id == listItem.id);
	categoryArray.splice(categoryIndex, 1);

	// Reset the incrementId to the length of the category array. This is to ensure that the id's are always unique.
	incrementId = categoryArray.length + 1;
	listItem.remove();

	setCategoryInLocalStorage(categoryArray);

	// If there are no categories left, remove the categories key from local storage.
	if (categoryArray.length == 0) {
		localStorage.removeItem("categories");
	}
};

// Helper function to populate the form selectors with the color and icon options and change the color of the icon selector to match the color selected.
const populateList = (palette, selector, label) => {
	palette.map((item) => {
		const option = document.createElement("option");
		option.value = item[label];
		option.textContent = item[label];
		option.classList.add(item[label].toLowerCase()); // A bit bugged, there should be no emoji classes... but it works for now.
		selector.appendChild(option);
	});
};

// Helper function to validate the category name so that it doesn't allow certain categories to be created.
const validateCategoryName = (categoryName) => {
	if (categoryName == "") throw new Error("Category name cannot be empty.");
	if (categoryArray.some((category) => category.name == categoryName)) throw new Error("Category name already exists.");
	if (categoryName.length > 20) throw new Error("Category name cannot be longer than 20 characters.");
	if (categoryName.length < 3) throw new Error("Category name cannot be shorter than 3 characters.");
	if (categoryList.children.length >= 6) throw new Error("You cannot have more than 6 categories.");
};

// Helper function to change the color of the icon selector to match the color selected.
const colorChangeHandler = (event) => {
	const color = event.target.value;
	iconSelector.classList.remove(iconSelector.classList[1]);
	colorSelector.classList.remove(colorSelector.classList[1]);
	iconSelector.classList.add(color.toLowerCase());
	colorSelector.classList.add(color.toLowerCase());
};

// Handle the form submission to validate the category name, create a new category and set the category array in local storage.
const addCategory = (event) => {
	event.preventDefault();
	const categoryName = formNameInput.value.trim();
	const icon = iconSelector.value;
	const color = colorSelector.value;

	// Try to validate the category name, if it fails, display an error message.
	try {
		validateCategoryName(categoryName);
		createNewCategory(categoryName, icon, color);
		setCategoryInLocalStorage(categoryArray);
	} catch (error) {
		const errorMessage = document.createElement("p");
		errorMessage.textContent = error.message;
		formNameInput.classList.add("error");
		formNameInput.after(errorMessage);

		// Remove the error displays after 1 second.
		setTimeout(() => {
			formNameInput.classList.remove("error");
			errorMessage.remove();
		}, 1000);
	}

	form.reset();
};

(() => {
	// Use helper functions to start the app with some initializers.
	populateList(colorPalette, colorSelector, "name");
	populateList(iconPalette, iconSelector, "value");
	initialState(colorSelector, "Coral", "coral");
	initialState(iconSelector, "💼", "coral");

	form.addEventListener("submit", addCategory);
	colorSelector.addEventListener("change", colorChangeHandler);

	localStorage.getItem("categories") ? localStorageHandler() : null;
})();
