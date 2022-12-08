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
const colorPicker = document.querySelector("#color-picker");
const categoriesList = document.querySelector("#category-list");

//<-- Variables -->

const categories = [];
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

const categoryTemplate = ({ name, id, icon, color }) => {
	const template = document.querySelector("#category-template").content.cloneNode(true);
	const category = template.querySelector("li");
	const categoryName = template.querySelector("h2");
	const categoryIcon = template.querySelector("span");

	category.classList.add(color.toLowerCase());
	category.id = id;
	categoryName.textContent = name;
	categoryIcon.textContent = icon;

	return category;
};

const createCategory = (categoryName, icon, color) => {
	incrementId++;
	const newCategory = categoryTemplate({ name: categoryName, id: "category-" + incrementId, icon: icon, color: color });
	categoriesList.append(newCategory);
	return categories.push(newCategory);
};

const updateCategories = () => {
	localStorage.setItem("categories", JSON.stringify(categories));
};

const getCategories = () => {};

//<=== Functions ===>

const checkCategoryName = (categoryName) =>
	categoryName.length >= 4 && categoryName.length <= 20
		? true
		: (alert("Category name must be between 4 and 20 characters"), false);

const populateList = (palette, picker, label) =>
	palette.map((item) => {
		const option = document.createElement("option");
		option.value = item[label];
		option.textContent = item[label];
		picker.appendChild(option);
	});

//<=== Event Handlers ===>

const addCategoryHandler = (event) => {
	event.preventDefault();
	const categoryName = categoryNameInput.value.trim();
	const icon = iconSelector.value;
	const color = colorPicker.value;

	if (categoryName) createCategory(categoryName, icon, color);
	updateCategories();
};

// <=== Event Listeners ===>

form.addEventListener("submit", addCategoryHandler);

// <=== Program ===>

populateList(palette.icon, iconSelector, "value");
populateList(palette.color, colorPicker, "name");
