const locationCollection = document.querySelector(".location-collection")

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
    console.log(locationDiv)
    locationCollection.append(locationDiv)

    locationDiv.addEventListener("click", (evt) => {
        fetch('http:/localhost:3000/sightseeings')
        .then(res => res.json())
        .then((sightseeings) => {
            console.log(sightseeings)
        })
    })
    
}

