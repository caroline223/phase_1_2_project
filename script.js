let pageNum = 1;
let pageURL = `https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=10`


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
        console.log(drinkArr)
        drinkArr.forEach(generateDrink)
    })
}

function generateDrink(drink) {
    let drinkDiv = document.createElement('div')
    document.querySelector('#drink-container').appendChild(drinkDiv)
    drinkDiv.id = `drink-${drink.id}`
    drinkDiv.classList.add("drink-div")

    //generating the drink's name
    drinkName = document.createElement('h3')
    drinkName.innerText = drink.name 
    drinkDiv.appendChild(drinkName)

    //generating the drink's image (if applicable)

    drinkImg = document.createElement('img')
    drinkImg.src = drink.image_url
    drinkDiv.appendChild(drinkImg)


    //generating the drink's tag line

    drinkTag = document.createElement('p')
    drinkTag.innerText = drink.tagline
    drinkDiv.appendChild(drinkTag)

    //generating the date the drink was brewed

    drinkDate = document.createElement('p')
    drinkDate.innerText = drink.first_brewed
    drinkDiv.appendChild(drinkDate)

    //generating the drink's description

    drinkDes = document.createElement('p')
    drinkDes.innerText = drink.description 
    drinkDiv.appendChild(drinkDes)

    //generating the drink's ingredients
    /*drinkIngredients = document.createElement('p')
    drinkIngredients.innerText = drink.ingredients 
    drinkDiv.appendChild(drinkIngredients)
    */
    
}

function newDrink(event) {
    event.preventDefault()
    let drinkData = {
        name: event.currentTarget[0].value,
        image: event.currentTarget[1].value,
        date: event.currentTarget[2].value,
        ingredients: event.currentTarget[3].value,
        tagline: event.currentTarget[4].value,
        description: event.currentTarget[5].value
    }

    fetch(pageURL, configObj)
    .then(response => response.json())
    .then(generateDrink)

    let configObj = {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(drinkData)
    }
}

function previousPage(e) {
    fetch(`https://api.punkapi.com/v2/beers?page=${pageNum-=1}&per_page=10`)
    .then(response => response.json())
    .then(drinkArr => {
        document.querySelector('#drink-container').innerHTML=""
        drinkArr.forEach(generateDrink)
    })
}

function nextPage(e) {
    fetch(`https://api.punkapi.com/v2/beers?page=${pageNum+=1}&per_page=10`)
    .then(response => response.json())
    .then(drinkArr => {
        document.querySelector('#drink-container').innerHTML=""
        drinkArr.forEach(generateDrink)
    })
}