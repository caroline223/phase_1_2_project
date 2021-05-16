let pageNum = 1
let isLastPage = false
let pageURL = `https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=20`;
let allDrinks = []

const backButton = document.createElement('button')
const forwardButton = document.createElement('button')


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#random-drink-button").addEventListener('click', randomDrink)
    document.querySelector("#featured-drink-button").addEventListener('click', getAllDrinks)
    document.querySelector("#drink-dropdown").addEventListener('change', filterDrinks) 
    document.querySelector("#reset-button").addEventListener('click', resetPage)
     
    document.getElementById('target_div_3').innerHTML = 'Click below to learn about our featured drinks or a surprise drink!'
    document.getElementById('target_div_3').style.color = 'yellow'
    document.getElementById('target_div_3').style.fontSize = '22px'
    document.getElementById('target_div_1').style.fontWeight = '22px'

    document.querySelector("#drink-dropdown").style.visibility = "hidden" 
    
})

    

    function getAllDrinks(){
        fetch(pageURL)
        .then(response => response.json())
        .then(drinkArr => {
            allDrinks = drinkArr
            drinkArr.forEach(generateDrink)
        })

        document.body.style.backgroundImage = "url('background_image.jpeg')"
        document.body.style.backgroundSize = "1430px"
        document.body.style.backgroundRepeat = "repeat"
    
        document.querySelector("#random-drink-button").style.visibility = "hidden"
        document.querySelector("#featured-drink-button").style.visibility = "hidden"
        
        document.getElementById('target_div_2').innerHTML = "Bonus Feature:" 
            document.getElementById('target_div_2').style.fontFamily = "cursive"
            document.getElementById('target_div_2').style.color = 'yellow'
            document.getElementById('target_div_2').style.fontSize = '22px'
            document.getElementById('target_div_2').style.visibility = "visible"
        
        document.getElementById('target_div_1').innerHTML= "Filter Featured Drinks That Begin With:" 
            document.getElementById('target_div_1').style.fontFamily = "cursive"
            document.getElementById('target_div_1').style.color = 'yellow'
            document.getElementById('target_div_1').style.fontSize = '22px'
            document.getElementById('target_div_1').style.visibility = "visible"
        
       
        document.getElementById('target_div_3').style.visibility = "hidden" 

        previousButton()
        nextButton()
        
    }

    function generateDrink(drink) {
        let drinkDiv = document.createElement('div')
        document.querySelector('#drink-container').appendChild(drinkDiv)

        document.querySelector("#drink-dropdown").style.visibility = "visible"
        
        //drink's name
        drinkName = document.createElement('h3')
        drinkName.innerText = drink.name 
        drinkDiv.appendChild(drinkName)

        //drink's image
        drinkImg = document.createElement('img')
        drinkImg.src = drink.image_url ? drink.image_url : './default_image.png'
        drinkImg.width = 200
        drinkImg.height = 400
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
            document.querySelector('#drink-container').innerHTML = ""
            generateDrink(randomArr[0])
            randomArr.map(generateRandomDrink)
        })    
        document.querySelector("#featured-drink-button").style.visibility = "hidden" 
        document.getElementById('target_div_2').style.visibility = "hidden" 
        document.getElementById('target_div_3').style.visibility = "hidden" 

        document.body.style.backgroundImage = "url('background_image.jpeg')"
        document.body.style.backgroundSize = "1430px"
        document.body.style.backgroundRepeat = "repeat"

    } 

    function filterDrinks(event) {

       //get the value selected using the event object
       let letter = event.target.value
       //filter the allDrinks array using the selected value -  drink.name.startsWith(letter)
       const filteredDrinks = allDrinks.filter((drink) => {
           return drink.name.startsWith(letter)
       })
       // clear drink container of previous drinks
       document.querySelector('#drink-container').innerHTML = ""
       //iterate over new filtered array, calling generateDrink with each drink element
       filteredDrinks.forEach(generateDrink)   

       backButton.remove()
       forwardButton.remove()
    }

    function generateRandomDrink(random) {
        let randomDiv = document.createElement('div')
        document.querySelector('#random-container').appendChild(randomDiv)

        document.querySelector("#drink-dropdown").style.visibility = "hidden"

    }

    function previousButton() {
        backButton.innerHTML="Previous"
        backButton.style.backgroundColor = "yellow"
        backButton.style.borderRadius = "12px"
        backButton.style.padding = "5px"
        backButton.style.fontFamily= "cursive"
        document.querySelector('#drink-button').appendChild(backButton)
        backButton.addEventListener("click", previousPage)
    }


    function nextButton() {
        forwardButton.innerHTML="Next" 
        forwardButton.style.backgroundColor = "yellow"
        forwardButton.style.borderRadius = "12px"
        forwardButton.style.padding = "5px"
        forwardButton.style.fontFamily= "cursive"
        document.querySelector('#drink-button').appendChild(forwardButton)
        forwardButton.addEventListener("click", nextPage)
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
        previousButton();
        nextButton();
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

        document.querySelector('#drink-container').innerHTML=""
        document.querySelector('#random-container').innerHTML=""
        
        document.querySelector("#random-drink-button").style.visibility = "visible"
        document.querySelector("#featured-drink-button").style.visibility = "visible"

        document.querySelector("#drink-dropdown").style.visibility = "hidden"

        document.getElementById('target_div_1').style.visibility = "hidden"
        document.getElementById('target_div_2').style.visibility = "hidden" 
        document.getElementById('target_div_3').style.visibility = "visible" 
    
        backButton.remove()
        forwardButton.remove()
       
}






