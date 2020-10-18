let recipeQueryUrl;
let drinkQueryUrl;
let recipeSettings;
let drinkSettings;
let recipeDetailSettings;
let drinkDetailSettings;

// Create query to attach to end of url for recommended recipes call
const createIngredientQuery = function (ingredients) {
  recipeQueryUrl = '';
  $.each(ingredients, function(i, ingredient) {
    recipeQueryUrl += `${ingredient},`
  })

  // Spoonacular settings for fridge search
  recipeSettings = {
    "async": true,
    "crossDomain": true,
    "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=3&ranking=1&ignorePantry=false&ingredients=${recipeQueryUrl}`,
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
    .done(response => createRecRecipeCards(response))
    .fail(err => console.log(err));
}

// Query settings for recipe detail 
const createRecipeDetailQuery = function (recipeId) {
  recipeDetailSettings = {
    "async": true,
    "crossDomain": true,
    "url": `https://rapidapi.p.rapidapi.com/recipes/${recipeId}/information`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "30f7c86108msh0a2c55a921ebb17p135deajsnfe7b5b9d6d81"
    }
  };
}

// Ajax call for spoonacular API recipe details
const getRecipeDetails = function () {
  $.ajax(recipeDetailSettings)
  .done(response => createFoodModal(response.id, response))
  .fail(err => console.log(err));
}


/* 

Cocktail DB API Calls Below

*/
const createDrinkIngredientQuery = function (ingredients) {
  drinkQueryUrl = '';
  $.each(ingredients, function(i, ingredient) {
    drinkQueryUrl += `${ingredient},`  
  })

  drinkQueryUrl = drinkQueryUrl.substring(0, drinkQueryUrl.length-1);

  drinkSettings = {
    "async": true,
    "crossDomain": true,
    "url": `https://rapidapi.p.rapidapi.com/filter.php?i=${drinkQueryUrl}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": "eceb5683acmsh105ea019445dccap110759jsn54872afdfd23"
    }
  };
}

const getRecDrinks = function () {
  $.ajax(drinkSettings)
    .done(response => createRecDrinkCards(response))
    .fail(err => console.log(err));
}


// Query settings for drink detail 
const createDrinkDetailQuery = function (drinkId) {
  drinkDetailSettings = {
    "async": true,
    "crossDomain": true,
    "url": `https://rapidapi.p.rapidapi.com/lookup.php?i=${drinkId}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": "eceb5683acmsh105ea019445dccap110759jsn54872afdfd23"
    }
  };
}

// Ajax call for spoonacular API recipe details
const getDrinkDetails = function (id) {
  $.ajax(drinkDetailSettings)
  .done(response => createDrinkModal(id, response.drinks[0]))
  .fail(err => console.log(err));
}