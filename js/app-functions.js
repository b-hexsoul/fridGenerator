// Grab ingredients from input field
// Split ingredients with regex into an array
// Use loop to setup query url and add that to end of api call
// ingredients.split(/[ , ]/);
let queryUrl;
let recipeSettings;

// Create query to attach to end of url for recommended recipes call
const createIngredientQuery = function (ingredients) {
  queryUrl = '';
  $.each(ingredients, function(i, ingredient) {
    queryUrl += `${ingredient},`
  })

  // Spoonacular settings for fridge search
  recipeSettings = {
    "async": true,
    "crossDomain": true,
    "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=3&ranking=1&ignorePantry=false&ingredients=${queryUrl}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "eceb5683acmsh105ea019445dccap110759jsn54872afdfd23"
    }
  }
}

// Ajax call for spoonacular API
const getRecRecipes = function () {
  $.ajax(recipeSettings)
    // Once response promise is returned, put function here to paint the UI and display recipe summaries. 
    .done(response => console.log(response))
    .fail(err => console.log(err));
}

// Create recommended recipe cards - 3 for now. 