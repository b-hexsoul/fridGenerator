let ingredients = '';

// Search Event - Uses ingredients to GET request spoonacular API for recipes
searchFoodBtn.click(function (e) {
  ingredients = foodInput.val().trim().split(', ')
  createIngredientQuery(ingredients);
  // getRecRecipes();
  // delete below and uncomment above when ready for production, below uses prepopulated ingredients query
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

// Favorites page event - populate favorites from local storage.
$(window).on("load", function () {
  if (window.location.href.match('/favorites.html') != null) {
    favRecipesEl.empty();
    let favRecipes = getStoredRecipes();
    console.log(favRecipes);
    renderFavoriteRecipes(favRecipes);
  }
})

// Slider element for "Jumbotron"
UIkit.slider(element).startAutoplay();