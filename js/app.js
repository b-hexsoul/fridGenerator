const searchBtn = $('#searchBtn');
const inputEl = $('input');

let ingredients = '';

// Search Event - Uses ingredients to GET request spoonacular API for recipes
searchBtn.click(function (e) {
  ingredients = inputEl.val().trim().split(', ')
  console.log(ingredients);
  createIngredientQuery(ingredients);
  getRecRecipes();
})

