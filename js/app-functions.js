// ingredients.split(/[ , ]/);

const searchFoodBtn = $('#searchFoodBtn');
const foodInput = $('#foodInput');
const recipesEl = $('#recRecipesCard');
const favRecipesEl = $('#favRecipesCard');
const favLinkEl = $('.favLink');

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
    .done(response => createRecRecipeCards(response))
    .fail(err => console.log(err));
}

// Create recommended recipe cards - 3 for now
// for each recipe, create card, then create modal
// create event handler for click on card; when card clicked, modal pops up, event function runs,
// event function creates ajax request for recipe details, details are populated
// Recipe save button on modal? 
const createRecRecipeCards = function (response) {
  recipesEl.empty();
  $.each(response, function (i, recipe) {
    let div = $('<div>');
    div.html(
      `
      <div>
        <div class="uk-card uk-card-default uk-card-hover">
          <div class="uk-card-body">
            <h3 id="recipeTitle" class="uk-card-title">${recipe.title}</h3>
          </div>
          <div class="uk-card-media-bottom">
            <img id="recipeImg" src="${recipe.image}" alt="">
          </div>
          <div class="uk-card-footer">
            <button class="uk-button uk-button-default favoriteRecipeBtn" data-id="${recipe.id}" data-title="${recipe.title}" data-image="${recipe.image}"><i class="fas fa-heart"></i></button>
          </div>
        </div>
      </div>
      `
    )
    recipesEl.append(div);
  })
  
  // Favorite Recipe Button Event - Once clicked saves to localstorage
  let favoriteRecipeBtn = $('.favoriteRecipeBtn')
  favoriteRecipeBtn.click(function (e) {
    let id = $(this).data('id');
    let title = $(this).data('title');
    let image = $(this).data('image');
    recipeToStorage(id, title, image)
  })
}

// Render Favorite Recipes - When user reaches the favorites page, localstorage is accessed and recipe ids are retrieved, GET request based on id and populate cards
const renderFavoriteRecipes = function (favRecipes) {
  favRecipesEl.empty();
  $.each(favRecipes, function (i, recipe) {
    let div = $('<div>');
    div.html(
      `
      <div class="uk-margin-top uk-padding-small">
        <div class="uk-card uk-card-default uk-card-hover">
          <div class="uk-card-body">
            <h3 id="recipeTitle" class="uk-card-title">${recipe.title}</h3>
          </div>
          <div class="uk-card-media-bottom">
            <img id="recipeImg" src="${recipe.image}" alt="">
          </div>
        </div>
      </div>
      `
    )
    favRecipesEl.append(div);
  })
}


// Render Favorite Drinks - When user reaches the favorites page, localstorage accessed 

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


// Modal popup? Create modal and add to DOM when cards are created? 




// This is a response for recipes we can use
let exResponse = [{id: 611026, title: "Apple Crisp III", image: "https://spoonacular.com/recipeImages/611026-312x231.jpg", imageType: "jpg", usedIngredientCount: 3}, {id: 47950, title: "Cinnamon Apple Crisp", image: "https://spoonacular.com/recipeImages/47950-312x231.jpg", imageType: "jpg", usedIngredientCount: 3}, {id: 70306, title: "Easy Cinnamon Apple Pie", image: "https://spoonacular.com/recipeImages/70306-312x231.jpg", imageType: "jpg", usedIngredientCount: 3}]

// $.each(exResponse, function(i, recipe) {
//   let div = $('<div>');
//   div.html(
//     `
//     <div>
//       <div class="uk-card uk-card-default uk-card-hover">
//         <div class="uk-card-body">
//           <h3 id="recipeTitle" class="uk-card-title">${recipe.title}</h3>
//         </div>
//         <div class="uk-card-media-bottom">
//           <img id="recipeImg" src="${recipe.image}" alt="">
//         </div>
//       </div>
//     </div>
//     `
//   )
//   recipesEl.append(div);
// })

