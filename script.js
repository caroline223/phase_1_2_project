let pageNum = 1;
let pageURL = ``;


document.addEventListener("DOMContentLoaded", function() {
    getAllDrinks();
    document.querySelector(".create-drink-form").addEventListener("submit", newDrink)
    document.querySelector("#forward").addEventListener("click", nextPage)
    document.querySelector("#back").addEventListener("click", previousPage)
})

function getAllDrinks(){
    fetch(pageURL)
    .then(response => response.json())
    .then(drinkArr => {
        drinkArr.forEach(generateDrink)
    })
}

function generateDrink(drink) {
    let drinkDiv = document.createElement('div')
    document.querySelector('#drink-container').appendChild(drinkDiv)


    //generating the drink's name
    drinkName = document.createElement('h3')
    drinkName.innerText = drink.name 
    drinkDiv.appendChild(drinkName)


    //generating the drink's ingredients
    drinkIngredients = document.createElement('p')
    drinkIngredients.innerText = drink.ingredients 
    drinkDiv.appendChild(drinkIngredients)

    //generating the drink's description

    drinkDes = document.createElement('p')
    drinkDes.innerText = drink.description 
    drinkDiv.appendChild(drinkDes)

    //generating the drink's image (if applicable)

    drinkImg = document.createElement('img')
    drinkImg.innerHTML = drink.image
    drinkDiv.appendChild(drinkImg)
}

function newDrink(e) {
    event.preventDefault()

    let drinkData = {
        name: event.currentTarget[0].value,
        image: event.currentTarget[1].value,
        ingredients: event.currentTarget[2].value,
        description: event.currentTarget[3].value
    }

    fetch(pageURL, configObj)
    .then(response => response.json())
    .then(generateDrink)

    let configObj = {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(drinkData)
    }

    function previousPage(e) {
        fetch(``)
        .then(response => response.json())
        .then(drinkArr => {
            document.querySelector('#drink-container').innerHTML=""
            drinkArr.forEach(generateDrink)
        })
    }

    function nextPage(e) {
        fetch(``)
        .then(response => response.json())
        .then(drinkArr => {
            document.querySelector('#drink-container').innerHTML=""
            drinkArr.forEach(generateDrink)
        })
    }
}