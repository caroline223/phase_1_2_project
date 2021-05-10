let pageNum = 1
let isLastPage = false
let pageURL = `https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=20`;
let newDrinkArr = []
let beerName = "_"


const backButton = document.createElement('button')
const forwardButton = document.createElement('button')
const resetButton = document.createElement('button')



document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#random-drink-button").addEventListener('click', randomDrink)
    document.querySelector("#featured-drink-button").addEventListener('click', getAllDrinks)
    document.querySelector("#drink-dropdown").addEventListener('change', function(event) {
        filterDrinks(event.target.value)
    }) 
    
    document.getElementById('target_div_1').innerHTML += 'Filter Drinks That Begin With:'
    document.getElementById('target_div_2').innerHTML += 'OR:'
    document.getElementById('target_div_3').innerHTML += 'Click below to learn about our featured drinks or a surprise drink!'
    
})

function filterDrinks(letter) {
    fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`)
    .then(response => response.json())
    .then(newDrinkArr => {
        console.log(newDrinkArr)
        document.querySelector("#filter-container").innerHTML=""
        generateDrinkFilter
    })

    document.querySelector("#random-drink-button").style.visibility = "hidden"
    document.querySelector("#featured-drink-button").style.visibility = "hidden"

    
    document.getElementById('target_div_2').style.visibility = "hidden" 
    document.getElementById('target_div_3').style.visibility = "hidden" 

    resetButton.innerHTML="Reset"
    document.querySelector('#drink-button').appendChild(resetButton)
    resetButton.addEventListener("click", resetPage)
}

function generateDrinkFilter() {

    let searchDiv = document.createElement('div')
    document.querySelector('#filter-drinks').appendChild(searchDiv)

    let filter = newDrinkArr.filter(search => search.startsWith(letter))
    filter.forEach(search => {
        //drink's name
        searchName = document.createElement('h3')
        searchName.innerText = search.name 
        searchDiv.appendChild(searchName)

        //drink's image
        searchImg = document.createElement('img')
        searchImg.src = search.image_url ? search.image_url : './default_image.png'
        searchImg.width = 300
        searchImg.height = 500
        searchDiv.appendChild(searchImg)

        //drink's tag line
        searchTag = document.createElement('p')
        searchTag.innerText = "Tag Line: " + search.tagline
        searchDiv.appendChild(searchTag)

        //date the drink was brewed
        searchDate = document.createElement('p')
        searchDate.innerText =  "Date Brewed: " + search.first_brewed
        searchDiv.appendChild(searchDate)

        //drink's description
        searchDes = document.createElement('p')
        searchDes.innerText = "Description: " + search.description 
        searchDiv.appendChild(searchDes)

        //drink's food pairing
        searchFood = document.createElement('p')
        searchFood.innerText =  "Food Pairing: " + search.food_pairing
        searchDiv.appendChild(searchFood)

        //drink's brewer's tips
        searchBrew = document.createElement('p')
        searchBrew.innerText =  "Brewer's Tips: " + search.brewers_tips
        searchDiv.appendChild(searchBrew)
     })         
}

function getAllDrinks(){
    fetch(pageURL)
    .then(response => response.json())
    .then(drinkArr => {
        console.log(drinkArr)
        drinkArr.forEach(generateDrink)
    })
   
    backButton.innerHTML="Previous"
    document.querySelector('#drink-button').appendChild(backButton)
    
    
    forwardButton.innerHTML="Next" 
    document.querySelector('#drink-button').appendChild(forwardButton)

    resetButton.innerHTML="Reset"
    document.querySelector('#drink-button').appendChild(resetButton)
    
    backButton.addEventListener("click", previousPage)
    forwardButton.addEventListener("click", nextPage)
    resetButton.addEventListener("click", resetPage)
    
    document.querySelector("#random-drink-button").style.visibility = "hidden"
    document.querySelector("#featured-drink-button").style.visibility = "hidden"
    backButton.style.visibility = "hidden"

    
    document.getElementById('target_div_2').style.visibility = "hidden" 
    document.getElementById('target_div_3').style.visibility = "hidden" 
    
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
        document.querySelector("#random-container").innerHTML=""
        randomArr.map(generateRandomDrink)
    })    
    document.querySelector("#featured-drink-button").style.visibility = "hidden" 
    document.getElementById('target_div_2').style.visibility = "hidden" 
    document.getElementById('target_div_3').style.visibility = "hidden" 

    resetButton.innerHTML="Reset"
    document.querySelector('#drink-button').appendChild(resetButton)

     resetButton.addEventListener("click", resetPage)

} 



function generateRandomDrink(random) {
    let randomDiv = document.createElement('div')
    document.querySelector('#random-container').appendChild(randomDiv)

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




function previousPage(e) {
    if (pageNum <= 1) {
        fetch(`https://api.punkapi.com/v2/beers?page=${pageNum=1}&per_page=20`)
        .then(response => response.json())
        .then(drinkArr => {
            document.querySelector("#drink-container").innerHTML=""
            drinkArr.forEach(generateDrink)
        })  
        backButton.style.visibility = "hidden"
    } 
    else {
        fetch(`https://api.punkapi.com/v2/beers?page=${pageNum-=1}&per_page=20`)
        .then(response => response.json())
        .then(drinkArr => {
            document.querySelector("#drink-container").innerHTML=""
            drinkArr.forEach(generateDrink)
        })
        forwardButton.style.visibility = "visible"  
   }
    
}

function nextPage(e) {
    console.log(pageNum, isLastPage)
     if (!isLastPage) {
         pageNum++
        fetch(`https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=20`)
        .then(response => response.json())
        .then(drinkArr => {
           document.querySelector("#drink-container").innerHTML=""
                if (drinkArr.length < 20) {
                    isLastPage = true
                    forwardButton.style.visibility = "hidden"
                }
                drinkArr.forEach(generateDrink)
        }) 
     } 
     backButton.style.visibility = "visible"     
}

function resetPage(){
    document.querySelector("#drink-container").innerHTML=""
    document.querySelector("#random-container").innerHTML=""
    window.location.reload()
}




