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

// LocalStorage Save recipe details
const recipeDetailToStorage = function (id, title, image, cookTime, servings, summary, link) {
  let recipeDetail = getStoredRecipeDetails();
  // Validation to see if recipe is in favorites already
  let recipeDetailCheck = recipeDetail.findIndex(recipeDetail => recipeDetail.id === id);
  if (recipeDetailCheck < 0) {
    recipeDetail.push({
      id: id,
      title: title,
      image: image,
      cookTime: cookTime,
      servings: servings,
      summary: summary,
      link: link
    })
    localStorage.setItem('recipeDetail', JSON.stringify(recipeDetail));
  }
}

// Localstorage get Recipe Detail
const getStoredRecipeDetails = function () {
  let recipeDetail = localStorage.getItem('recipeDetail')
  if (recipeDetail !== null) {
    return JSON.parse(recipeDetail);
  } else {
    return [];
  }
}


// Localstorage Save Cocktails 
