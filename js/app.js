let ingredientsFood = '';
let ingredientsDrink = '';

// Search Event - Uses ingredients to GET request spoonacular API for recipes
searchFoodBtn.click(function (e) {
  ingredientsFood = foodInput.val().trim().split(', ')
  createIngredientQuery(ingredientsFood);
  // getRecRecipes();
  // delete below and uncomment above when ready for production, below uses prepopulated ingredients query
  createRecRecipeCards(exResponse);
  foodInput.val('');
})

// If user presses enter on input field after done inputting ingredients
foodInput.keypress(function (e) {
  if (e.which == 13) {
    ingredients = foodInput.val().trim().split(', ')
    createIngredientQuery(ingredients);
    getRecRecipes();
    foodInput.val('');
  }
})


// Drinks page
// Drink search Event
searchDrinkBtn.click(function (e) {
  ingredientsDrink = drinkInput.val().trim().split(', ')
  createDrinkIngredientQuery(ingredientsDrink);
  getRecDrinks()
  drinkInput.val();
})

// If user presses enter on input field after done inputting ingredients
drinkInput.keypress(function (e) {
  if (e.which == 13) {
    ingredientsDrink = drinkInput.val().trim().split(', ')
    createDrinkIngredientQuery(ingredientsDrink);
    getRecDrinks();
    drinkInput.val('');
  }
})


// Favorites Page
// Favorites page event - populate favorites from local storage.
$(window).on("load", function () {
  if (window.location.href.match('/favorites.html') != null) {
    favRecipesEl.empty();
    let favRecipes = getStoredRecipes();
    renderFavoriteRecipes(favRecipes);

    favDrinksEl.empty();
    let favDrinks = getStoredDrinks();
    renderFavoriteDrinks(favDrinks);
  }
})
