// Your mini-app should take user input for

//     A category name
//     A category icon
//     A category colour

// When the user clicks ‘Next’, it should display the recently added category name, icon and colour, with a ‘Back’ button (not designed).
// When the user clicks ‘Back’, the newly created category should now be added to the list and displayed.
// When the user chooses a previously made category and clicks ‘next’, it should display the previously set category name, icon and colour.
// The user is also able to delete the category by hovering over the category and pressing the ‘delete’ (rubbish bin) icon.
// The user is able to edit the category by hovering over the category and pressing the ‘edit’ (pencil) icon.
// Uses localStorage to store the categories.
// You will be scored on how easy the code is to follow, understand, and maintain. Please give thought to folder structure and any additional unseen elements of your code.

const initialState = {
	categories: [],
	selectedCategory: null,
};

const actions = {
	addCategory: (state, category) => {
		return {
			...state,
			categories: [...state.categories, category],
			selectedCategory: category,
		};
	},

	selectCategory: (state, category) => {
		return {
			...state,
			selectedCategory: state.categories[index],
		};
	},

	deleteCategory: (state, index) => {
		return {
			...state,
			categories: state.categories.filter((_, i) => i !== index),
		};
	},

	editCategory: (state, index) => {
		const newCategory = helperFunctions.createCategory();
		const newCategories = [...state.categories];
		newCategories[index] = newCategory;

		return {
			...state,
			categories: newCategories,
		};
	},

	reset: () => initialState,
};

const helperFunctions = {
	createCategory: () => {
		const name = prompt("Enter a category name");
		const icon = prompt("Enter a category icon");
		const color = prompt("Enter a category color");
		return (newCategory = { name, icon, color });
	},
};

function render(state, actions) {
	const container = document.createElement("main");
	const categoryList = document.createElement("ul");
	const addCategoryButton = document.createElement("button");

	addCategoryButton.innerText = "Add Category";
	addCategoryButton.addEventListener("click", () => {
		helperFunctions.createCategory();
		actions.addCategory(newCategory);
	});

	const resetButton = document.createElement("button");
	resetButton.innerText = "Reset";
	resetButton.addEventListener("click", () => {
		actions.reset();
	});

	state.categories.forEach((category, index) => {
		const categoryButton = document.createElement("button");
		categoryButton.innerText = category.name;
		categoryButton.style.color = category.color;
		categoryButton.addEventListener("click", () => {
			actions.selectCategory(index);
		});

		const deleteButton = document.createElement("button");
		deleteButton.innerText = "🗑️";
		deleteButton.addEventListener("click", () => {
			actions.deleteCategory(index);
		});

		const editButton = document.createElement("button");
		editButton.innerText = "✏️";
		editButton.addEventListener("click", () => {
			actions.editCategory(index);
		});

		categoryList.appendChild(categoryButton);
		categoryList.appendChild(editButton);
		categoryList.appendChild(deleteButton);
	});

	const selectedCategory = document.createElement("div");
	selectedCategory.textContent = state.selectedCategory ? `${state.selectedCategory.name}${state.selectedCategory.icon} ${state.selectedCategory.color}` : "No category selected";

	const backButton = document.createElement("button");
	backButton.innerText = "Back";
	backButton.addEventListener("click", () => {
		actions.selectCategory(null);
	});

	container.appendChild(addCategoryButton);
	container.appendChild(resetButton);
	container.appendChild(categoryList);
	container.appendChild(selectedCategory);
	container.appendChild(backButton);

	return container;
}

function update(state, action, value) {
	const newState = actions[action](state, value);
	const container = render(newState, {
		addCategory: (category) => update(newState, "addCategory", category),
		selectCategory: (index) => update(newState, "selectCategory", index),
		deleteCategory: (index) => update(newState, "deleteCategory", index),
		reset: () => update(newState, "reset"),
	});

	document.body.replaceChild(container, document.body.firstChild);
}

update(initialState, "reset");
