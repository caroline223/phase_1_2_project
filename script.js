let pageNum = 1;
let pageURL = `https://api.punkapi.com/v2/beers?page=${pageNum }&per_page=20`


document.addEventListener("DOMContentLoaded", function() {
    getAllDrinks();
    //document.querySelector("#search-drink-form-by-name").addEventListener("submit", newDrink)
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
    
}

/*function newDrink(event) {
    event.preventDefault()
    let drinkData = {
        name: event.currentTarget[0].value,
        image_url: event.currentTarget[1].value,
        first_brewed: event.currentTarget[2].value,
        tagline: event.currentTarget[3].value,
        description: event.currentTarget[4].value
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
*/


function previousPage(e) {
    fetch(`https://api.punkapi.com/v2/beers?page=${pageNum-=1}&per_page=20`)
    .then(response => response.json())
    .then(drinkArr => {
        document.querySelector('#drink-container').innerHTML=""
        drinkArr.forEach(generateDrink)
    })

    if (pageNum < 1) {
        fetch(`https://api.punkapi.com/v2/beers?page=${pageNum=1}&per_page=20`)
        .then(response => response.json())
        .then(drinkArr => {
            document.querySelector('#drink-container').innerHTML=""
            drinkArr.forEach(generateDrink)
        })  
    }
}

function nextPage(e) {
    fetch(`https://api.punkapi.com/v2/beers?page=${pageNum+=1}&per_page=20`)
    .then(response => response.json())
    .then(drinkArr => {
        document.querySelector('#drink-container').innerHTML=""
        drinkArr.forEach(generateDrink)
    })
}