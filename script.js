let pageNum = 1;
let pageURL = `http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=${pageNum }`;


document.addEventListener("DOMContentLoaded", function() {
    getAllRecipes();
    document.querySelector(".create-recipe-form").addEventListener("submit", newRecipe)
    document.querySelector("#forward").addEventListener("click", nextPage)
    document.querySelector("#back").addEventListener("click", previousPage)
})

function getAllRecipes(){
    fetch(pageURL)
    .then(response => response.json())
    .then(recipeArr => {
        recipeArr.forEach(generateRecipe)
    })
}

function generateRecipe(recipe) {
    let recipeDiv = document.createElement('div')
    document.querySelector('#recipe-container').appendChild(recipeDiv)


    //generating the recipe's name
    recipeName = document.createElement('h3')
    recipeName.innerText = recipe.name 
    recipeDiv.appendChild(recipeName)


    //generating the recipe's ingredients
    recipeIngredients = document.createElement('p')
    recipeIngredients.innerText = recipe.ingredients 
    recipeDiv.appendChild(recipeIngredients)

    //generating the recipe's description

    recipeDes = document.createElement('p')
    recipeDes.innerText = recipe.description 
    recipeDiv.appendChild(recipeDes)

    //generating the recipe's image (if applicable)

    recipeImg = document.createElement('img')
    recipeImg.innerHTML = recipe.image
    recipeDiv.appendChild(recipeImg)
}