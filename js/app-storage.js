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
const drinkToStorage = function (id, title, image) {
  let drinks = getStoredDrinks();
  // Validation to see if drink is in favorites already
  let drinkCheck = drinks.findIndex(drink => drink.id === id);
  if (drinkCheck < 0) {
    drinks.push({
      id: id,
      title: title,
      image: image,
    })
    localStorage.setItem('drinks', JSON.stringify(drinks));
  }
}

// Localstorage Get Drinks
const getStoredDrinks = function () {
  let drinks = localStorage.getItem('drinks')
  if (drinks !== null) {
    return JSON.parse(drinks);
  } else {
    return [];
  }
}

// LocalStorage Save drink details
const drinkDetailToStorage = function (id, title, image, summary, ingredients) {
  let drinkDetails = getStoredDrinkDetails();
  // Validation to see if recipe is in favorites already
  let drinkDetailCheck = drinkDetails.findIndex(drinkDetails => drinkDetails.id === id);
  if (drinkDetailCheck < 0) {
    drinkDetails.push({
      id: id,
      title: title,
      image: image,
      summary: summary,
      ingredients: ingredients
    })
    localStorage.setItem('drinkDetails', JSON.stringify(drinkDetails));
  }
}

// Localstorage get Drink Detail
const getStoredDrinkDetails = function () {
  let drinkDetails = localStorage.getItem('drinkDetails')
  if (drinkDetails !== null) {
    return JSON.parse(drinkDetails);
  } else {
    return [];
  }
}