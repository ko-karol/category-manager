// <==== Variables ====>

// Select the category list ul element, the form elements and define the color and icon options for categories.
const categoryList = document.querySelector("#category-list");
const formElements = {
	form: document.querySelector("#form"),
	formNameInput: document.querySelector("#form-name-input"),
	iconSelector: document.querySelector("#icon-selector"),
	colorPicker: document.querySelector("#color-picker"),
};
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

// Define the category array and the id incrementor at which to start the category id.
let categoryArray = [];
let incrementId = categoryArray.length;

// <==== Functions ====>

// Set the (category) param to localStorage, only used for categoryArray for now.
const setCategoryInLocalStorage = (category) => localStorage.setItem("categories", JSON.stringify(category));

// Create a new category using the category template, add the category to the categoryList and array.
// Adds the edit and delete event listeners to the buttons generated for each category.
// The category info is stored in an object and pushed to the categoryArray.
function createNewCategory(categoryName, icon, color) {
	const generateCategory = (id, categoryName, icon, color) => {
		const categoryTemplate = document.querySelector("#category-template").content.cloneNode(true);
		const newCategory = categoryTemplate.querySelector("li");

		const newCategoryName = categoryTemplate.querySelector("h2");
		const newCategoryIcon = categoryTemplate.querySelector("span");
		const newCategoryEdit = categoryTemplate.querySelector(".edit");
		const newCategoryDelete = categoryTemplate.querySelector(".delete");

		newCategory.id = id;
		newCategoryName.textContent = categoryName;
		newCategoryIcon.textContent = icon;
		newCategoryEdit.textContent = "✏️";
		newCategoryDelete.textContent = "🗑️";
		newCategoryIcon.classList.add(color.toLowerCase());

		newCategoryEdit.addEventListener("click", editCategory);
		newCategoryDelete.addEventListener("click", deleteCategory);

		return newCategory;
	};

	const categoryInfo = { id: incrementId, name: categoryName, icon: icon, color: color };

	categoryList.append(generateCategory(incrementId++, categoryName, icon, color));
	categoryArray.push(categoryInfo);
}

// When the edit button is clicked, the category is editable. //TODO: Add the ability to edit the category name, icon and color.
const editCategory = (event) => {};

// When the delete button is clicked, the category is removed from the categoryList and categoryArray then the categoryArray is set to localStorage.
// categoryIndex is based on the id of the category, which is the index + 1 because the id starts at 1.
// If the categoryArray is empty, the categories key is removed from localStorage.
const deleteCategory = (event) => {
	const listItem = event.target.closest("li");
	const categoryIndex = categoryArray.findIndex((category) => category.id == listItem.id);
	categoryArray.splice(categoryIndex, 1);
	incrementId = categoryArray.length + 1;
	listItem.remove();

	setCategoryInLocalStorage(categoryArray);

	if (categoryArray.length == 0) {
		localStorage.removeItem("categories");
	}
};

// Initialize the form elements with the default values and populate the icon and color selectors with the options.
// If there are categories in localStorage, populate the categoryList with the categories.
// Validate the category name input and add the category to the categoryList and array when the form is submitted.
// When the color selector is changed, the color of the icon changes to match the selected color.
(function initialize() {
	const { form, formNameInput, iconSelector, colorPicker } = formElements;

	const initialState = (type, value, color) => {
		type.value = value;
		type.classList.add(color.toLowerCase());
	};

	const localStorageHandler = (event) => {
		const categories = JSON.parse(localStorage.getItem("categories"));
		categories.map((category) => createNewCategory(category.name, category.icon, category.color));
	};

	const populateList = (palette, selector, label) =>
		palette.map((item) => {
			const option = document.createElement("option");
			option.value = item[label];
			option.textContent = item[label];
			option.classList.add(item[label].toLowerCase());
			selector.appendChild(option);
		});

	const addCategory = (event) => {
		event.preventDefault();

		const validateCategoryName = (categoryName) =>
			categoryName.length >= 4 && categoryName.length <= 20
				? "isValidCategoryName"
				: (alert("Category name must be between 4 and 20 characters"), "isNotValidCategoryName");

		const categoryName = formNameInput.value.trim();
		const icon = iconSelector.value;
		const color = colorPicker.value;

		validateCategoryName(categoryName);
		createNewCategory(categoryName, icon, color);
		setCategoryInLocalStorage(categoryArray);
	};

	const colorChangeHandler = (event) => {
		const color = event.target.value;
		iconSelector.classList.remove(iconSelector.classList[1]);
		colorPicker.classList.remove(colorPicker.classList[1]);
		iconSelector.classList.add(color.toLowerCase());
		colorPicker.classList.add(color.toLowerCase());
	};

	populateList(palette.color, colorPicker, "name");
	populateList(palette.icon, iconSelector, "value");
	initialState(colorPicker, "Coral", "coral");
	initialState(iconSelector, "💼", "coral");

	form.addEventListener("submit", addCategory);
	colorPicker.addEventListener("change", colorChangeHandler);
	localStorage.getItem("categories") ? localStorageHandler() : null;
})();
