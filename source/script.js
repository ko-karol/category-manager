//<==== Variables ====>

// Select the category list element from the DOM
const categoryList = document.querySelector("#category-list");

// Select the form elements from the DOM
const formElements = {
	form: document.querySelector("#form"),
	formNameInput: document.querySelector("#form-name-input"),
	iconSelector: document.querySelector("#icon-selector"),
	colorPicker: document.querySelector("#color-picker"),
};

// Define the color and icon options for categories
const palette = {
	color: [
		{ name: "Coral", color: "#FF8370" },
		{ name: "Blue-green", color: "#00B1B0" },
		{ name: "Freesia", color: "#FEC84D" },
		{ name: "Fuschia", color: "#E42256" },
		{ name: "Lilac", color: "#BD97CB" },
		{ name: "Pinkish", color: "#FCC2D2" },
	],

	icon: [
		{ name: "briefcase", value: "💼" },
		{ name: "moneybag", value: "💰" },
		{ name: "greenbook", value: "📗" },
		{ name: "bluebook", value: "📘" },
		{ name: "orangebook", value: "📙" },
		{ name: "redbook", value: "📕" },
	],
};

// Define the category array
let categoryArray = [];

// Define the increment at which to start the category id
let incrementId = categoryArray.length;

//<==== Functions ====>

// Set (category) parameter to local storage - only used for categoryArray at the moment
const setCategoryInLocalStorage = (category) => localStorage.setItem("categories", JSON.stringify(category));

// Create a new category and add it to the category list and category array
function createNewCategory(categoryName, icon, color) {
	// Generate a new category from the template in the DOM
	const generateCategory = (id, categoryName, icon, color) => {
		const categoryTemplate = document.querySelector("#category-template").content.cloneNode(true);

		// Select the elements from the template
		const newCategory = categoryTemplate.querySelector("li");
		const newCategoryName = categoryTemplate.querySelector("h2");
		const newCategoryIcon = categoryTemplate.querySelector("span");
		const newCategoryEdit = categoryTemplate.querySelector(".edit");
		const newCategoryDelete = categoryTemplate.querySelector(".delete");

		// Set the html content of the elements
		newCategory.id = id;
		newCategoryName.textContent = categoryName;
		newCategoryIcon.textContent = icon;
		newCategoryEdit.textContent = "✏️";
		newCategoryDelete.textContent = "🗑️";
		newCategoryIcon.classList.add(color.toLowerCase());

		// Edit the category
		const editCategory = (event) => {};

		// Delete the category from the category list and category array and update the local storage
		const deleteCategory = (event) => {
			// Get the id of the category to be deleted //? (+1 because the index starts at 0 and the id starts at 1)
			const categoryIndex = categoryArray.findIndex((category) => category.id == id) + 1;

			// Remove the category from the category array and update the local storage
			categoryArray.splice(categoryIndex, 1);

			// Update the id of the remaining categories
			incrementId = categoryArray.length + 1;

			// Remove the category from the DOM
			newCategory.remove();

			setCategoryInLocalStorage(categoryArray);

			// Remove the categories key from local storage if the category array is empty
			if (categoryArray.length == 0) localStorage.removeItem("categories");
		};

		// Add event listeners to the edit and delete buttons
		newCategoryEdit.addEventListener("click", editCategory);
		newCategoryDelete.addEventListener("click", deleteCategory);

		// Return the new category to the createNewCategory function
		return newCategory;
	};

	// Assign the new category to a variable
	const newCategory = generateCategory(incrementId++, categoryName, icon, color);

	// Parameters to be pushed to the category array
	const categoryInfo = { id: `${incrementId}`, name: categoryName, icon: icon, color: color };

	// Add the new category to the category list in DOM and category array
	categoryList.append(newCategory);
	categoryArray.push(categoryInfo);
}

// Initialize the application
(function initialize() {
	// Extract the form elements from the formElements object
	const { form, formNameInput, iconSelector, colorPicker } = formElements;

	// Set the initial state of the form selects
	const initialState = (type, value, color) => {
		type.value = value;
		type.classList.add(color.toLowerCase());
	};

	// Get the categories from local storage and populate the category list
	const localStorageHandler = (event) => {
		const categories = JSON.parse(localStorage.getItem("categories"));
		categories.map((category) => createNewCategory(category.name, category.icon, category.color));
	};

	// Populate the form selects with the palette options
	const populateList = (palette, selector, label) =>
		palette.map((item) => {
			const option = document.createElement("option");
			option.value = item[label];
			option.textContent = item[label];
			option.classList.add(item[label].toLowerCase());
			selector.appendChild(option);
		});

	// Event handler for the form submit
	const addCategory = (event) => {
		event.preventDefault();

		// Validate the category name //TODO: Make it function as an actual validator instead of an alert
		const validateCategoryName = (categoryName) =>
			categoryName.length >= 4 && categoryName.length <= 20
				? "isValidCategoryName"
				: (alert("Category name must be between 4 and 20 characters"), "isNotValidCategoryName");

		// Extract the values from the form
		const categoryName = formNameInput.value.trim();
		const icon = iconSelector.value;
		const color = colorPicker.value;

		// Validate, create and set the category.
		validateCategoryName(categoryName);
		createNewCategory(categoryName, icon, color);
		setCategoryInLocalStorage(categoryArray);
	};

	// Event handler for changing the color of form selects
	const colorChangeHandler = (event) => {
		const color = event.target.value;
		iconSelector.classList.remove(iconSelector.classList[1]);
		colorPicker.classList.remove(colorPicker.classList[1]);
		iconSelector.classList.add(color.toLowerCase());
		colorPicker.classList.add(color.toLowerCase());
	};

	// Callbacks
	populateList(palette.color, colorPicker, "name");
	populateList(palette.icon, iconSelector, "value");
	initialState(colorPicker, "Coral", "coral");
	initialState(iconSelector, "💼", "coral");

	form.addEventListener("submit", addCategory);
	colorPicker.addEventListener("change", colorChangeHandler);
	localStorage.getItem("categories") ? localStorageHandler() : null;
})();

// const showCategoryHandler = (event) => {
// 	const category = event.target.closest("li");
// 	const buttons = document.querySelectorAll("button");
// 	const categories = document.querySelectorAll(`li:not(#${category.getAttribute("id")})`);
// 	const backButton = document.createElement("button");
// 	categories.forEach((category) => category.classList.add("hidden"));
// 	buttons.forEach((button) => button.classList.add("hidden"));
// 	backButton.textContent = "Back";
// 	backButton.classList.add("button");
// 	category.append(backButton);
// 	category.classList.add("modal");
// 	backButton.addEventListener("click", backHandler);
// };

// const backHandler = (event) => {
// 	const category = event.target.closest("li");
// 	const categories = document.querySelectorAll(`li:not(#${category.id})`);
// 	const buttons = category.querySelectorAll("button");
// 	categories.forEach((category) => category.classList.remove("hidden"));
// 	buttons.forEach((button) => button.classList.remove("hidden"));
// 	category.classList.remove("modal");
// 	event.target.remove();
// };
