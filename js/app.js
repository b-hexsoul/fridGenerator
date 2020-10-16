let ingredients = '';

// Search Event - Uses ingredients to GET request spoonacular API for recipes
searchFoodBtn.click(function (e) {
  ingredients = foodInput.val().trim().split(', ')
  createIngredientQuery(ingredients);
  // getRecRecipes();
  createRecRecipeCards(exResponse);
  foodInput.val('');
})

// If user presses enter on input field after done inputting ingredients
// foodInput.keypress(function (e) {
//   if (e.which == 13) {
//     ingredients = foodInput.val().trim().split(', ')
//     createIngredientQuery(ingredients);
//     getRecRecipes();
//     foodInput.val('');
//   }
// })


