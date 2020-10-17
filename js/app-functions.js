// ingredients.split(/[ , ]/);

const searchFoodBtn = $('#searchFoodBtn');
const foodInput = $('#foodInput');
const recipesEl = $('#recRecipesCard');
const favRecipesEl = $('#favRecipesCard');
const favLinkEl = $('.favLink');
const modalContainer = $('.modalContainer')

let recipeQueryUrl;
let recipeSettings;
let recipeDetailSettings;

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
const getRecipeDetails = function (i) {
  $.ajax(recipeDetailSettings)
  .done(response => createModal(i, response))
  .fail(err => console.log(err));
}

// Create recommended recipe cards - 3 for now
// for each recipe, create card, then create modal
// create event handler for click on card; when card clicked, modal pops up, event function runs,
// event function creates ajax request for recipe details, details are populated
// Recipe save button on modal? 
const createRecRecipeCards = function (response) {
  recipesEl.empty();
  modalContainer.empty();
  $.each(response, function (i, recipe) {
    let div = $('<div>');
    div.html(
      `
      <div>
        <div class="uk-card uk-card-default uk-card-hover">
          <div uk-toggle="target: #foodmodal${i}">
            <div class="uk-card-body">
              <h3 id="recipeTitle" class="uk-card-title">${recipe.title}</h3>
            </div>
            <div class="uk-card-media-bottom">
              <img id="recipeImg" src="${recipe.image}" alt="">
            </div>
          </div>
          <div class="uk-card-footer">
            <button class="uk-button uk-button-default favoriteRecipeBtn" data-id="${recipe.id}" data-title="${recipe.title}" data-image="${recipe.image}"><i class="fas fa-heart"></i></button>
          </div>
        </div>
      </div>
      `
    )
    recipesEl.append(div);
    createRecipeDetailQuery(recipe.id);
    getRecipeDetails(i)
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

// Create Modal for each rec recipe card
const createModal = function (i, recipe) {
  // Create Modal HTML for DOM
  let div = $('<div>');
  div.html(
    `
    <div id="foodmodal${i}" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h1 class="title">${recipe.title}</h1>
        <div class="uk-padding-large" uk-overflow-auto>
          <img src="${recipe.image}" alt="">
          <p class="cookTime">Ready in: ${recipe.readyInMinutes}</p>
          <p class="servings"> Servings: ${recipe.servings}</p>
          <p class="summary">${recipe.summary}</p>
          <a href="${recipe.sourceUrl}" target="_blank">Recipe Website</a>
          <p class="uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <button class="uk-button uk-button-primary" type="button">Save</button>
          </p>
        </div>
      </div>
    </div>
    `
  )
  modalContainer.append(div);
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

