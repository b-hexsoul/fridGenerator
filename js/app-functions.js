// ingredients.split(/[ , ]/);

const searchFoodBtn = $('#searchFoodBtn');
const searchDrinkBtn = $('#searchDrinkBtn');
const foodInput = $('#foodInput');
const drinkInput = $('#drinkInput');
const recipesEl = $('#recRecipesCard');
const drinksEl = $('#recDrinksCard');
const favRecipesEl = $('#favRecipesCard');
const favLinkEl = $('.favLink');
const modalContainer = $('.modalContainer')


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
          <div uk-toggle="target: #foodmodal${recipe.id}">
            <div class="uk-card-body">
              <h3 id="recipeTitle" class="uk-card-title">${recipe.title}</h3>
            </div>
            <div class="uk-card-media-bottom">
              <img id="recipeImg" src="${recipe.image}" alt="">
            </div>
          </div>
          <div class="uk-card-footer">
            <button class="uk-button uk-button-default favoriteRecipeBtn" data-modal="#foodmodal${recipe.id}" data-id="${recipe.id}" data-title="${recipe.title}" data-image="${recipe.image}"><i class="fas fa-heart"></i></button>
          </div>
        </div>
      </div>
      `
    )
    recipesEl.append(div);
    createRecipeDetailQuery(recipe.id);
    getRecipeDetails()
  })
  
  // Favorite Recipe Button Event - Once clicked saves to localstorage
  let favoriteRecipeBtn = $('.favoriteRecipeBtn')
  favoriteRecipeBtn.click(function (e) {
    let modalId = $(this).data('modal');
    let summaryEl = $(`${modalId} .summary`)
    let cookTimeEl = $(`${modalId} .readyInMinutes`)
    let servingsEl = $(`${modalId} .servings`)
    let linkEl = $(`${modalId} .link`)
    let id = $(this).data('id');
    let title = $(this).data('title');
    let image = $(this).data('image');
    let cookTime = cookTimeEl.text();
    let servings = servingsEl.text();
    let summary = summaryEl.text();
    let link = linkEl.attr('href');

    recipeToStorage(id, title, image)
    recipeDetailToStorage(id, title, image, cookTime, servings, summary, link);
  })
}

// Create Modal for each rec recipe card
const createFoodModal = function (id, recipe) {
  // Create Modal HTML for DOM
  let div = $('<div>');
  div.html(
    `
    <div id="foodmodal${id}" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h1 class="title">${recipe.title}</h1>
        <div class="uk-padding-large" uk-overflow-auto>
          <img src="${recipe.image}" alt="">
          <p>Ready in: <span class="readyInMinutes">${recipe.readyInMinutes}</span></p>
          <p> Servings: <span class="servings">${recipe.servings}</span></p>
          <p class="summary">${recipe.summary}</p>
          <a class="link" href="${recipe.sourceUrl}" target="_blank">Recipe Website</a>
          <p class="uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Back</button>
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
  modalContainer.empty();
  $.each(favRecipes, function (i, recipe) {
    let div = $('<div>');
    div.html(
      `
      <div class="uk-margin-top uk-padding-small">
        <div uk-toggle="target: #foodmodal${recipe.id}">
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
    let recipeDetails = getStoredRecipeDetails();
    let details = recipeDetails.find(detail => detail.id === recipe.id)
    createModal(recipe.id, details)
  })
}

/*

DRINKS FUNCTIONS

*/
const createRecDrinkCards = function (response) {
  drinksEl.empty();
  modalContainer.empty();
  $.each(response.drinks, function (i, drink) {
    let div = $('<div>');
    div.html(
      `
      <div>
        <div class="uk-card uk-card-default uk-card-hover">
          <div uk-toggle="target: #drinkmodal${drink.idDrink}">
            <div class="uk-card-body">
              <h3 id="recipeTitle" class="uk-card-title">${drink.strDrink}</h3>
            </div>
            <div class="uk-card-media-bottom">
              <img id="recipeImg" src="${drink.strDrinkThumb}" alt="">
            </div>
          </div>
          <div class="uk-card-footer">
            <button class="uk-button uk-button-default favoriteDrinkBtn" data-modal="#drinkmodal${drink.idDrink}" data-id="${drink.idDrink}" data-title="${drink.strDrink}" data-image="${drink.strDrinkThumb}"><i class="fas fa-heart"></i></button>
          </div>
        </div>
      </div>
      `
    )
    drinksEl.append(div);
    createDrinkDetailQuery(drink.idDrink);
    getDrinkDetails(drink.idDrink);
  })

  // Favorite Drink Button Event - Once clicked saves to localstorage
  let favoriteDrinkBtn = $('.favoriteDrinkBtn')
  favoriteDrinkBtn.click(function (e) {
    let modalId = $(this).data('modal');
    let summaryEl = $(`${modalId} .summary`)
    let ingredientsEl = $(`${modalId} .ingredients`)

    let id = $(this).data('id');
    let title = $(this).data('title');
    let image = $(this).data('image');
    let summary = summaryEl.text();
    let ingredients = ingredientsEl.text();

    drinkToStorage(id, title, image)
    drinkDetailToStorage(id, title, image, summary, ingredients);
  })
};

// Create Modal for each rec drink card
const createDrinkModal = function (id, drink) {
  // Create Ingredients String
  let ingArray = [drink.strIngredient1,drink.strIngredient2,drink.strIngredient3,drink.strIngredient4,drink.strIngredient5,drink.strIngredient6,drink.strIngredient7,drink.strIngredient8,drink.strIngredient9,drink.strIngredient10,drink.strIngredient11,drink.strIngredient12,drink.strIngredient13,drink.strIngredient14,drink.strIngredient15]
  let ingredients = "";
  $.each(ingArray, function(i, ing) {
    if (ing !== null) {
      ingredients += `${ing}, `;
    }
  })
  ingredients = ingredients.substring(0, ingredients.length -2);
  
  // Create Modal HTML for DOM
  let div = $('<div>');
  div.html(
    `
    <div id="drinkmodal${id}" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h1 class="title">${drink.strDrink}</h1>
        <div class="uk-padding-large" uk-overflow-auto>
          <img src="${drink.strDrinkThumb}" alt="">
          <p class="summary">${drink.strInstructions}</p>
          <p>Ingredients: <span class="ingredients">${ingredients}</span></p>
          <p class="uk-text-right">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Back</button>
          </p>
        </div>
      </div>
    </div>
    `
  )
  modalContainer.append(div);
}

// This is a response for recipes we can use
let exResponse = [{id: 611026, title: "Apple Crisp III", image: "https://spoonacular.com/recipeImages/611026-312x231.jpg", imageType: "jpg", usedIngredientCount: 3}, {id: 47950, title: "Cinnamon Apple Crisp", image: "https://spoonacular.com/recipeImages/47950-312x231.jpg", imageType: "jpg", usedIngredientCount: 3}, {id: 70306, title: "Easy Cinnamon Apple Pie", image: "https://spoonacular.com/recipeImages/70306-312x231.jpg", imageType: "jpg", usedIngredientCount: 3}]