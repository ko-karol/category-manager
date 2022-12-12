const form = document.querySelector("#form");
const categoryNameInput = document.querySelector("#form-name-input");
const iconSelector = document.querySelector("#icon-selector");
const colorSelector = document.querySelector("#color-picker");
const categoriesList = document.querySelector("#category-list");

//<-- Variables -->

let categoriesArray = [];
let incrementId = categoriesArray.length;

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

const populateList = (palette, selector, label) => {
	palette.map((item) => {
		const option = document.createElement("option");
		option.value = item[label];
		option.textContent = item[label];
		option.classList.add(item[label].toLowerCase());
		selector.appendChild(option);
	});
};

const validateCategoryName = (categoryName) => {
	categoryName.length >= 4 && categoryName.length <= 20
		? "isValidCategoryName"
		: (alert("Category name must be between 4 and 20 characters"), "isNotValidCategoryName");
};

//<=== Functions ===>

const createNewCategory = (categoryName, icon, color) => {
	const categoryTemplate = (id, name, icon, color) => {
		const categoryTemplate = document.querySelector("#category-template").content.cloneNode(true);

		const newCategory = categoryTemplate.querySelector("li");
		const newCategoryName = categoryTemplate.querySelector("h2");
		const newCategoryIcon = categoryTemplate.querySelector("span");
		const newCategoryEdit = categoryTemplate.querySelector(".edit");
		const newCategoryDelete = categoryTemplate.querySelector(".delete");

		newCategory.classList.add(color.toLowerCase());
		newCategory.id = id;

		newCategoryName.textContent = name;
		newCategoryIcon.textContent = icon;
		newCategoryEdit.textContent = "✏️";
		newCategoryDelete.textContent = "🗑️";

		newCategoryDelete.addEventListener("click", deleteCategoryHandler);
		newCategoryEdit.addEventListener("click", editCategoryHandler);
		//category.addEventListener("click", showCategoryHandler);

		return newCategory;
	};

	const newCategory = categoryTemplate(incrementId++, categoryName, icon, color);

	categoriesList.append(newCategory);
	categoriesArray.push({ id: `${incrementId}`, name: categoryName, icon: icon, color: color });
};

//<=== Event Handlers ===>

const localStorageHandler = (event) => {
	const categories = JSON.parse(localStorage.getItem("categories"));
	categories.map((category) => createNewCategory(category.name, category.icon, category.color));
};

const addCategoryHandler = (event) => {
	event.preventDefault();
	const categoryName = categoryNameInput.value.trim();
	const icon = iconSelector.value;
	const color = colorSelector.value;
	validateCategoryName(categoryName);
	createNewCategory(categoryName, icon, color);
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
	const categoryName = category.querySelector("h2");
	const categoryId = parseInt(category.id);
	const categoryIndex = categoriesArray.findIndex((category) => category.id == categoryId) + 1;
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

// <=== Program ===>

initialState(iconSelector, "Coral");
initialState(colorSelector, "Coral");

populateList(palette.icon, iconSelector, "value");
populateList(palette.color, colorSelector, "name");

window.addEventListener("load", localStorageHandler);
form.addEventListener("submit", addCategoryHandler);
colorSelector.addEventListener("change", colorChangeHandler);
