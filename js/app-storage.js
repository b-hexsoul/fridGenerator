// Localstorage Save Recipes - recipes need to be saved by Id
const recipeToStorage = function (id, title, image) {
  let recipes = getStoredRecipes();
  // Validation to see if recipe is in favorites already
  let recipeCheck = recipes.findIndex(recipe => recipe.id === id);
  if (recipeCheck < 0) {
    recipes.push({
      id: id,
      title: title,
      image: image,
    })
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }
}

// Localstorage Get Recipes
const getStoredRecipes = function () {
  let recipes = localStorage.getItem('recipes')
  if (recipes !== null) {
    return JSON.parse(recipes);
  } else {
    return [];
  }
}

// Localstorage Save Cocktails 
