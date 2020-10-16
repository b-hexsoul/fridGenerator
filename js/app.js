let ingredients = "bacon, flour cheese, fruit"

ingredients.split(/[ , ]/);


var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=1&ranking=1&ignorePantry=false&ingredients=apples,flour,sugar",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "eceb5683acmsh105ea019445dccap110759jsn54872afdfd23"
	}
}

$.ajax(settings)
  .done(response => console.log(response))
  .fail(err => console.log(err));




// Search Button Event
// 

// Save recipe button
// 

