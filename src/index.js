const locationCollection = document.querySelector(".location-collection")
const createButton = document.querySelector(".formbtn")
const formDiv = document.querySelector(".form-container")
const sightseeingContainer = document.querySelector(".sightseeing-container")

fetch("http://localhost:3000/locations")
.then(res => res.json())
.then((arrayOfLocations) => {
    // console.log(arrayOfLocations)
    arrayOfLocations.forEach((location) => {
        // console.log(location)
        renderLocation(location)
    })
})

let renderLocation = (location) => {
    let locationDiv = document.createElement("div")
    // console.log(locationDiv)

    // locationDiv.className = "location item"
    // locationDiv.innerText = location.className
    locationDiv.classList.add("location")

    let locationImg = document.createElement("img")
        locationImg.src = location.image_url
        locationImg.alt = location.name
        locationImg.classList.add("location-pic")


    let locationName = document.createElement("h2")
        locationName.innerText = location.name

    let locationDescription = document.createElement("p")
        locationDescription.innerText = location.description

    locationDiv.append(locationImg, locationName, locationDescription)
    // console.log(locationDiv)
    locationCollection.append(locationDiv)

    renderSightseeings(locationImg, location, locationCollection)
    
}

let sightseeingCardFunc = (sightseeing, locationCollection) => {
    // debugger
    let sightseeingCard = document.createElement("div")
    let imageTag = document.createElement("img")
    imageTag.src = sightseeing.image_url

    let sightseeingName = document.createElement("h2")
    sightseeingName.innerText = sightseeing.name

    let sightseeingDescription = document.createElement("p")
    sightseeingDescription.innerText = sightseeing.description

    sightseeingCard.append(imageTag, sightseeingName, sightseeingDescription)
    sightseeingContainer.append(sightseeingCard)
}

let renderSightseeings = (locationImg, location, locationCollection) => {
    if (locationImg) {
        locationImg.addEventListener("click", (evt) => {
            locationCollection.classList.add("hide")
            location.sightseeings.forEach((sightseeing) => {
                sightseeingCardFunc(sightseeing, locationCollection)
            })
        }) 
    }   
}



// createButton.addEventListener("click", (evt) => {


// })
