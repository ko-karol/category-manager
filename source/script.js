// Your mini-app should take user input for:
// a category name, a category icon, and a category colour.

// When the user clicks ‘Next’, it should display the recently added category, with a ‘Back’ button.

// back button submits
// next button shows the category as modal

// When the user clicks ‘Back’, the newly created category should now be added back to the list and displayed with the other categories.

// When the user clicks ‘Delete’, symbolized as the "🗑️" icon,  the category should be removed from the list and localStorage.

// When the user clicks "Edit", symbolized as the "✏️" icon, the category should be editable using the same input fields as when the category was created.

//<-- Elements -->

const form = document.querySelector("#form");
const categoryNameInput = document.querySelector("#form-name-input");
const iconSelector = document.querySelector("#icon-selector");
const colorSelector = document.querySelector("#color-picker");
const categoriesList = document.querySelector("#category-list");

//<-- Variables -->

let categoriesArray = [];
let incrementId = 0;

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

//<=== Helpers ===>

const initialState = (type, value) => type.classList.add(value.toLowerCase());
const setCategoryInLocalStorage = (category) => localStorage.setItem("categories", JSON.stringify(category));
const getCategoriesFromLocalStorage = () => (storedCategories = JSON.parse(localStorage.getItem("categories")));

const populateList = (palette, selector, label) =>
	palette.map((item) => {
		const option = document.createElement("option");
		option.value = item[label];
		option.textContent = item[label];
		option.classList.add(item[label].toLowerCase());
		selector.appendChild(option);
	});

const validateCategoryName = (categoryName) =>
	categoryName.length >= 4 && categoryName.length <= 20
		? "isValidCategoryName"
		: (alert("Category name must be between 4 and 20 characters"), "isNotValidCategoryName");

//<=== Functions ===>

const createNewCategory = (categoryName, icon, color) => {
	const categoryTemplate = ({ name, id, icon, color }) => {
		const template = document.querySelector("#category-template").content.cloneNode(true);

		const [category, categoryIcon, categoryName, editButton, deleteButton] =
			template.querySelectorAll("li, span, h2, button, button");

		category.classList.add(color.toLowerCase());
		category.id = id;

		categoryName.textContent = name;
		categoryIcon.textContent = icon;
		editButton.textContent = "✏️";
		deleteButton.textContent = "🗑️";

		deleteButton.addEventListener("click", deleteCategoryHandler);
		editButton.addEventListener("click", editCategoryHandler);
		//category.addEventListener("click", showCategoryHandler);

		return category;
	};

	const newCategory = categoryTemplate({
		name: categoryName,
		id: "category-" + incrementId++,
		icon: icon,
		color: color,
	});

	categoriesList.append(newCategory);
	categoriesArray.push({ name: categoryName, id: incrementId, icon, color });
};

//<=== Event Handlers ===>

const localStorageHandler = (event) => {
	const storedCategories = getCategoriesFromLocalStorage();
	storedCategories.map((category) => createNewCategory(category.name, category.icon, category.color));
};

const nextCategoryHandler = (event) => {
	event.preventDefault();
	validateCategoryName(categoryNameInput.value);
	const categoryName = categoryNameInput.value.trim();
	const icon = iconSelector.value;
	const color = colorSelector.value;

	if (categoryName) createNewCategory(categoryName, icon, color);

	setCategoryInLocalStorage(categoriesArray);
};

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

const colorChangeHandler = (event) => {
	const color = event.target.value;
	colorSelector.classList.remove(colorSelector.classList[1]);
	iconSelector.classList.remove(iconSelector.classList[1]);

	colorSelector.classList.add(color.toLowerCase());
	iconSelector.classList.add(color.toLowerCase());
};

const deleteCategoryHandler = (event) => {
	const category = event.target.closest("li");
	const categoryIndex = categoriesArray.findIndex((item) => item.id === category.id);
	categoriesArray.splice(categoryIndex, 1);
	setCategoryInLocalStorage(categoriesArray);
	category.remove();
};

const editCategoryHandler = (event) => {
	// Get the category from the categories array
	// Populate the form with the category info
	// Remove the category from the list
};

const backHandler = (event) => {
	const category = event.target.closest("li");
	const categories = document.querySelectorAll(`li:not(#${category.id})`);
	const buttons = category.querySelectorAll("button");
	categories.forEach((category) => category.classList.remove("hidden"));
	buttons.forEach((button) => button.classList.remove("hidden"));
	category.classList.remove("modal");
	event.target.remove();
};
// <=== Event Listeners ===>

window.addEventListener("load", localStorageHandler);
form.addEventListener("submit", nextCategoryHandler);
colorSelector.addEventListener("change", colorChangeHandler);

// <=== Program ===>

initialState(iconSelector, "Coral");
initialState(colorSelector, "Coral");
populateList(palette.icon, iconSelector, "value");
populateList(palette.color, colorSelector, "name");
