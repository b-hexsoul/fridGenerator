// ingredients.split(/[ , ]/);

const searchFoodBtn = $('#searchFoodBtn');
const inputEl = $('input');
const recipesEl = $('#recRecipesCard');

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
        </div>
      </div>
      `
    )
    recipesEl.append(div);
  })
}

// Render Favorite Recipes - When user reaches the favorites page, localstorage is accessed and recipe ids are retrieved, GET request based on id and populate cards

// Render Favorite Drinks - When user reaches the favorites page, localstorage accessed 

// Localstorage Save Recipes - recipes need to be saved by Id

// Localstorage Save Cocktails 

// Possible save recipe button icon on recipe cards? 

// Modal popup? 







// let exResponse = [{id: 611026, title: "Apple Crisp III", image: "https://spoonacular.com/recipeImages/611026-312x231.jpg", imageType: "jpg", usedIngredientCount: 3}, {id: 47950, title: "Cinnamon Apple Crisp", image: "https://spoonacular.com/recipeImages/47950-312x231.jpg", imageType: "jpg", usedIngredientCount: 3}, {id: 70306, title: "Easy Cinnamon Apple Pie", image: "https://spoonacular.com/recipeImages/70306-312x231.jpg", imageType: "jpg", usedIngredientCount: 3}]

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

