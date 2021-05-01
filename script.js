let pageNum = 1;
let pageURL = `http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=${pageNum }`;


document.addEventListener("DOMContentLoaded", function() {
    getAllRecipes();
    document.querySelector(".create-recipe-form").addEventListener("submit", newRecipe)
    document.querySelector("#forward").addEventListener("click", nextPage)
    document.querySelector("#back").addEventListener("click", previousPage)
})