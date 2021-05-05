let pageNum = 1;
let pageURL = `https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=20`;


document.addEventListener("DOMContentLoaded", function() {
    getAllDrinks();
    document.querySelector("#random-drink-button").addEventListener("click", randomDrink)
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
    .catch(error => {
        alert("File Not Available");
        console.log(error.message);
    })
}

function generateDrink(drink) {
    let drinkDiv = document.createElement('div')
    document.querySelector('#drink-container').appendChild(drinkDiv)
    
     //drink's name
    drinkName = document.createElement('h3')
    drinkName.innerText = drink.name 
    drinkDiv.appendChild(drinkName)

    //drink's image
    drinkImg = document.createElement('img')
    drinkImg.src = drink.image_url ? drink.image_url : './default_image.png'
    drinkImg.width = 300
    drinkImg.height = 500
    drinkDiv.appendChild(drinkImg)

    //drink's tag line
    drinkTag = document.createElement('p')
    drinkTag.innerText = "Tag Line: " + drink.tagline
    drinkDiv.appendChild(drinkTag)

    //date the drink was brewed
    drinkDate = document.createElement('p')
    drinkDate.innerText =  "Date Brewed: " + drink.first_brewed
    drinkDiv.appendChild(drinkDate)

    //drink's description
    drinkDes = document.createElement('p')
    drinkDes.innerText = "Description: " + drink.description 
    drinkDiv.appendChild(drinkDes)

    //drink's food pairing
    drinkFood = document.createElement('p')
    drinkFood.innerText =  "Food Pairing: " + drink.food_pairing
    drinkDiv.appendChild(drinkFood)

    //drink's brewer's tips
    drinkBrew = document.createElement('p')
    drinkBrew.innerText =  "Brewer's Tips: " + drink.brewers_tips
    drinkDiv.appendChild(drinkBrew)
}

function randomDrink(){ 
    fetch('https://api.punkapi.com/v2/beers/random')
    .then(response => response.json())
    .then(drinkArr => {
        console.log(drinkArr)
        document.querySelector("#random-drink").innerHTML=""
        drinkArr.map(generateDrink)
    })
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

    if (pageNum <= 1) {
        fetch(`https://api.punkapi.com/v2/beers?page=${pageNum=1}&per_page=20`)
        .then(response => response.json())
        .then(drinkArr => {
            document.querySelector("#drink-container").innerHTML=""
            drinkArr.forEach(generateDrink)
        })  
    } 
    else {
        fetch(`https://api.punkapi.com/v2/beers?page=${pageNum-=1}&per_page=20`)
        .then(response => response.json())
        .then(drinkArr => {
            document.querySelector("#drink-container").innerHTML=""
            drinkArr.forEach(generateDrink)
        })
   }
    
}

function nextPage(e) {
    fetch(`https://api.punkapi.com/v2/beers?page=${pageNum+=1}&per_page=20`)
    .then(response => response.json())
    .then(drinkArr => {
        //place an if-else conditional here
        document.querySelector("#drink-container").innerHTML=""
        drinkArr.forEach(generateDrink)
    })
}
