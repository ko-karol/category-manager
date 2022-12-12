//<==== Variables ====>

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

let categoryArray = [];
let incrementId = categoryArray.length;

//<==== Functions ====>

const setCategoryInLocalStorage = (category) => localStorage.setItem("categories", JSON.stringify(category));

function createNewCategory(categoryName, icon, color) {
	const generateCategory = (id, categoryName, icon, color) => {
		const categoryTemplate = document.querySelector("#category-template").content.cloneNode(true);

		const newCategory = categoryTemplate.querySelector("li");
		const newCategoryName = categoryTemplate.querySelector("h2");
		const newCategoryIcon = categoryTemplate.querySelector("span");
		const newCategoryEdit = categoryTemplate.querySelector(".edit");
		const newCategoryDelete = categoryTemplate.querySelector(".delete");

		newCategory.classList.add(color.toLowerCase());
		newCategory.id = id;

		newCategoryName.textContent = categoryName;
		newCategoryIcon.textContent = icon;
		newCategoryEdit.textContent = "✏️";
		newCategoryDelete.textContent = "🗑️";

		const editCategory = (event) => {};
		const deleteCategory = (event) => {
			const categoryIndex = categoryArray.findIndex((category) => category.id == id) + 1;
			categoryArray.splice(categoryIndex, 1);
			incrementId = categoryArray.length + 1;
			newCategory.remove();

			setCategoryInLocalStorage(categoryArray);
			if (categoryArray.length == 0) localStorage.removeItem("categories");
		};

		newCategoryEdit.addEventListener("click", editCategory);
		newCategoryDelete.addEventListener("click", deleteCategory);

		return newCategory;
	};

	const newCategory = generateCategory(incrementId++, categoryName, icon, color);
	const categoryInfo = { id: `${incrementId}`, name: categoryName, icon: icon, color: color };

	categoryList.append(newCategory);
	categoryArray.push(categoryInfo);
}

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
