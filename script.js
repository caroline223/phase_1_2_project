let pageNum = 1;
let pageURL = `https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=20`;


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#random-drink-button").addEventListener("click", randomDrink)
    document.querySelector("#featured-drink-button").addEventListener("click", getAllDrinks)
})

function getAllDrinks(){
    fetch(pageURL)
    .then(response => response.json())
    .then(drinkArr => {
        console.log(drinkArr)
        drinkArr.forEach(generateDrink)
    })

    const backButton = document.createElement('button')
        backButton.innerHTML="Previous"
        document.querySelector('#drink-button').appendChild(backButton)
    const forwardButton = document.createElement('button')
        forwardButton.innerHTML="Next" 
        document.querySelector('#drink-button').appendChild(forwardButton)
   
    backButton.addEventListener("click", previousPage)
    forwardButton.addEventListener("click", nextPage)
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
    .then(randomArr => {
        console.log(randomArr)
        document.querySelector("#random-drink").innerHTML=""
        randomArr.map(generateRandomDrink)
    })
} 

function generateRandomDrink(random) {
    let randomDiv = document.createElement('div')
    document.querySelector('#random-drink').appendChild(randomDiv)

    //drink's name
    randomName = document.createElement('h3')
    randomName.innerText = random.name 
    randomDiv.appendChild(randomName)

    //drink's image
    randomImg = document.createElement('img')
    randomImg.src = random.image_url ? random.image_url : './default_image.png'
    randomImg.width = 300
    randomImg.height = 500
    randomDiv.appendChild(randomImg)

    //drink's tag line
    randomTag = document.createElement('p')
    randomTag.innerText = "Tag Line: " + random.tagline
    randomDiv.appendChild(randomTag)

    //date the drink was brewed
    randomDate = document.createElement('p')
    randomDate.innerText =  "Date Brewed: " + random.first_brewed
    randomDiv.appendChild(randomDate)

    //drink's description
    randomDes = document.createElement('p')
    randomDes.innerText = "Description: " + random.description 
    randomDiv.appendChild(randomDes)

    //drink's food pairing
    randomFood = document.createElement('p')
    randomFood.innerText =  "Food Pairing: " + random.food_pairing
    randomDiv.appendChild(randomFood)

    //drink's brewer's tips
    randomBrew = document.createElement('p')
    randomBrew.innerText =  "Brewer's Tips: " + random.brewers_tips
    randomDiv.appendChild(randomBrew)
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

    if (pageNum >= 17) {
        fetch(`https://api.punkapi.com/v2/beers?page=${pageNum=17}&per_page=20`)
        .then(response => response.json())
        .then(drinkArr => {
            document.querySelector("#drink-container").innerHTML=""
            drinkArr.forEach(generateDrink)
        })  
    } 
    else {
        fetch(`https://api.punkapi.com/v2/beers?page=${pageNum+=1}&per_page=20`)
        .then(response => response.json())
        .then(drinkArr => {
           document.querySelector("#drink-container").innerHTML=""
                console.log(drinkArr)
                drinkArr.forEach(generateDrink)
        })   
    }
        
}

