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
const categoryNameInput = document.querySelector("#category-name");
const iconSelector = document.querySelector("#icon-selector");
const colorSelector = document.querySelector("#color-picker");
const categoriesList = document.querySelector("#category-list");

//<-- Variables -->

let categories = [];
let incrementId = 0;

const palette = {
	color: [
		{ name: "Coral", color: "#FF8370" },
		{ name: "Blue-green", color: "#00B1B0" },
		{ name: "Freesia", color: "#FEC84D" },
		{ name: "Fuschia", color: "#E42256" },
		{ name: "Lilac", color: "#BD97CB" },
		{ name: "Gold", color: "#FBC740" },
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

const categoryTemplate = ({ name, id, icon, color }) => {
	const template = document.querySelector("#category-template").content.cloneNode(true);
	const category = template.querySelector("li");
	const categoryName = template.querySelector("h2");
	const categoryIcon = template.querySelector("span");
	const editButton = template.querySelector(".edit");
	const deleteButton = template.querySelector(".delete");

	category.classList.add(color.toLowerCase());
	category.id = id;
	categoryName.textContent = name;
	categoryIcon.textContent = icon;
	editButton.textContent = "✏️";
	deleteButton.textContent = "🗑️";

	deleteButton.addEventListener("click", deleteCategoryHandler);
	editButton.addEventListener("click", editCategoryHandler);

	return category;
};

const updateCategory = (category) => {
	localStorage.setItem("categories", JSON.stringify(category));
};

const getCategories = () => {
	const storedCategories = JSON.parse(localStorage.getItem("categories"));
	if (!storedCategories) return;
	return storedCategories;
};

//<=== Functions ===>

const createCategory = (categoryName, icon, color) => {
	incrementId++;
	const newCategory = categoryTemplate({ name: categoryName, id: "category-" + incrementId, icon: icon, color: color });
	categoriesList.append(newCategory);

	const categoryInfo = {
		name: categoryName,
		id: incrementId,
		icon: icon,
		color: color,
	};

	categories.push(categoryInfo);
};

const checkCategoryName = (categoryName) =>
	categoryName.length >= 4 && categoryName.length <= 20
		? true
		: (alert("Category name must be between 4 and 20 characters"), false);

const populateList = (palette, selector, label) =>
	palette.map((item) => {
		const option = document.createElement("option");
		option.value = item[label];
		option.textContent = item[label];
		selector.appendChild(option);
	});

//<=== Event Handlers ===>

const localStorageHandler = (event) => {
	const storedCategories = getCategories();
	storedCategories.map((category) => createCategory(category.name, category.icon, category.color));
};

const addCategoryHandler = (event) => {
	event.preventDefault();
	checkCategoryName(categoryNameInput.value);
	const categoryName = categoryNameInput.value.trim();
	const icon = iconSelector.value;
	const color = colorSelector.value;

	if (categoryName) createCategory(categoryName, icon, color);
	updateCategory(categories);
};

const colorChangeHandler = (event) => {
	const color = event.target.value;
	colorSelector.classList.remove("coral", "blue-green", "freesia", "fuschia", "lilac", "gold");
	colorSelector.classList.add(color.toLowerCase());
};

const deleteCategoryHandler = (event) => {
	// Get the ID of the category
	// Remove the category from the list
	// Remove the category from the categories array
	// Update the localStorage
};

const editCategoryHandler = (event) => {};

// <=== Event Listeners ===>

window.addEventListener("load", localStorageHandler);
form.addEventListener("submit", addCategoryHandler);
colorSelector.addEventListener("change", colorChangeHandler);

// <=== Program ===>

initialState(colorSelector, "coral");
populateList(palette.icon, iconSelector, "value");
populateList(palette.color, colorSelector, "name");
