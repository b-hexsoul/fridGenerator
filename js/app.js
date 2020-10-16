let ingredients = '';

// Search Event - Uses ingredients to GET request spoonacular API for recipes
searchFoodBtn.click(function (e) {
  ingredients = inputEl.val().trim().split(', ')
  createIngredientQuery(ingredients);
  getRecRecipes();
  inputEl.val('');
})

// If user presses enter on input field after done inputting ingredients
$('input').keypress(function (e) {
  if (e.which == 13) {
    ingredients = inputEl.val().trim().split(', ')
    createIngredientQuery(ingredients);
    getRecRecipes();
    inputEl.val('');
  }
})
