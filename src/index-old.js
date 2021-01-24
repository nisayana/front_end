// let addSights = false
const locationCollection = document.querySelector(".location-collection")
const createSightBtn = document.querySelector(".formbtn")
const sightsForm = document.querySelector(".add-sights-form")
const formDiv = document.querySelector(".form-container")
const sightContainer = document.querySelector(".sightseeing-container")
const main = document.querySelector(".main")


fetch("http://localhost:3000/locations")
.then(res => res.json())
.then((arrayOfLocations) => {
    arrayOfLocations.forEach((location) => {
        renderLocation(location)
    })
})

let renderLocation = (location) => {
    createSightBtn.classList.add("hide")

    let locationDiv = document.createElement("div")
        locationDiv.classList.add("location")

    let locationImg = document.createElement("img")
        locationImg.src = location.image_url
        locationImg.alt = location.name
        locationImg.classList.add("location-pic")

    let locationName = document.createElement("h2")
        locationName.innerText = location.name

    let locationDesc = document.createElement("p")
        locationDesc.innerText = location.description

    locationDiv.append(locationImg, locationName, locationDesc)
    locationCollection.append(locationDiv)

    renderSight(locationImg, location, locationCollection)
}


let renderSight = (locationImg, location, locationCollection) => {
    if (locationImg) {
        locationImg.addEventListener("click", (evt) => {
            locationCollection.classList.add("hide")
            createSightBtn.classList.remove("hide")
            location.sightseeings.forEach((sightseeing) => {
                sightCardFunc(sightseeing, locationCollection)
            })
                createSightsFunc(location)
        }) 
    }   
}



let sightCardFunc = (sightseeing, locationCollection) => {
    // debugger
    let sightCard = document.createElement("div")

    let imageTag = document.createElement("img")
        imageTag.src = sightseeing.image_url
        imageTag.classList.add("sightseeing-pic")

    let sightName = document.createElement("h2")
        sightName.innerText = sightseeing.name

    let sightDesc = document.createElement("p")
        sightDesc.className = "desc"
        sightDesc.innerText = sightseeing.description

    let deleteBtn = document.createElement("button")
          deleteBtn.className = "delete"
          deleteBtn.innerText = "delete"

    let likes = document.createElement("div")
          likes.innerText = `${sightseeing.likes.length} ♥️`

    let likeBtn = document.createElement("button")
          likeBtn.className = "like-btn"
        //   likeBtn.classList.add("like")
          likeBtn.innerText = "♥️"

    let bucketList = document.createElement("button")
          bucketList.innerText = "Add to my bucket list"
          bucketList.className = "bucket-list"


    sightCard.append(imageTag, sightName, sightDesc, likes, likeBtn, deleteBtn) //editButton
    sightContainer.append(sightCard)

    bucketList.addEventListener("click", () => {
        addToMyBucketList(sightseeing)
    })

    increaseLikes(likeBtn, sightseeing, likes)
    deleteSight(deleteBtn, sightseeing, sightCard)
}

let createSightsFunc = (location) => {
    createSightBtn.addEventListener("click", (evt) => {
        sightContainer.classList.add("hide")

        let form = document.createElement("form")
            form.className = "form"

        let inputName = document.createElement("input")
        
        let br = document.createElement("br")
        // form.appendChild(br)
        
        let label1 = document.createElement("label")
            label1.for = "lname"
            label1.innerText = "Name: "
            inputName.type = "text"
            inputName.name = "lname"
            inputName.placeholder= "Sightseeing name"


        let br1 = document.createElement("br")
        // form.appendChild(br1)
        
        let inputDesc = document.createElement("textarea")
            inputDesc.style.height = "200px"
            inputDesc.style.width = "200px"

        let label2 = document.createElement("label")
            label2.for = "desc"
            label2.innerText = "Description: "
            inputDesc.type = "text"
            inputDesc.name = "desc"
            inputDesc.placeholder= "Sightseeing description"


        let br2 = document.createElement("br")
        // form.appendChild(br2)
        
        let inputImage = document.createElement("input")
        let label3 = document.createElement("label")
            label3.for = "image"
            label3.innerText = "Image-url: "
            inputImage.type = "text"
            inputImage.name = "image_url"
            inputImage.placeholder= "Image URL"

        let submitButton = document.createElement("button")
            submitButton.classList.add("submit-btn")
            submitButton.innerText = "Submit"

        form.append(inputName, br, inputImage, br1, inputDesc, br2, submitButton)
        formDiv.append(form)

        form.addEventListener("submit", (evt) => {
            evt.preventDefault()
            // console.log("hello")
            let newSightsName = evt.target.lname.value

            let newSightsDesc = evt.target["desc"].value
            
            let newSightsImg = evt.target["image_url"].value

            fetch(`http://localhost:3000/sightseeings`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
                name: newSightsName,
                description: newSightsDesc,
                likes: 0,
                image_url: newSightsImg,
                location_id: location.id
                })
            })
            .then(resp => resp.json())
            .then((newSights) => {
                sightCardFunc(newSights)
                form.innerHTML = ""
                formDiv.classList.add("hide")
            })
        })
    })
}

function increaseLikes (likeBtn, sightseeing, likes) {
    // console.log("from LIKE", likes)
    // let likeNum = 0
    likeBtn.addEventListener("click", (e) => {
        // in order to make a POST request we need a user and sightseeing 
        // console.log(userInfo)
        fetch("http://localhost:3000/likes", {
            method: "POST",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify({
                sightseeing_id: sightseeing.id,
                traveler_id: userInfo.id
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
        // send info to userInfo.likes
    })
}

function deleteSight (deleteBtn, sightseeing, sightCard){
    deleteBtn.addEventListener("click", (e) => {
        sightCard.remove()
        fetch(`http://localhost:3000/sightseeings/${sightseeing.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
    }) 
}


function addToMyBucketList(sightseeing) {

}