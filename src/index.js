// let addSights = false
const locationCollection = document.querySelector(".location-collection")
// const createSightBtn = document.querySelector(".formbtn")
const sightsForm = document.querySelector(".add-sights-form")
const formDiv = document.querySelector("#form-container")
const sightContainer = document.querySelector(".sightseeing-container")
const main = document.querySelector(".main")
const favorite = document.querySelector("#favorite")
const home = document.querySelector("#home")

// const allSightsReviews = document.createElement("div")
// const sightReview = document.createElement("div")
// const starRatingControl = new StarRating( '.star-rating' );
// console.log(starRatingControl)

let allReviews = []

// home.addEventListener("click", (evt) => {
//     renderLocation()
// })

fetch("http://localhost:3000/locations")
.then(res => res.json())
.then((arrayOfLocations) => {
    arrayOfLocations.forEach((location) => {
        renderLocation(location)
    })
})

let renderLocation = (location) => {
    // createSightBtn.classList.add("hide")

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
            // createSightBtn.classList.remove("hide")
            let createSightBtn = document.createElement("button")
                createSightBtn.className = "new-sight-btn"
                createSightBtn.innerText = "Create a new sigihtseeing"
            
                sightContainer.append(createSightBtn)
                createSightsFunc(createSightBtn, location)

            location.sightseeings.forEach((sightseeing) => {
                sightCardFunc(sightseeing, locationCollection)
            })
                createSightsFunc(location)
        }) 
    }   
}



let sightCardFunc = (sightseeing, locationCollection) => {
    // debugger
    // console.log(sightseeing)
    
    let sightCard = document.createElement("div")
        sightCard.className = "sight-card"

    let sightImg = document.createElement("img")
        sightImg.src = sightseeing.image_url
        sightImg.classList.add("sightseeing-pic")

    let sightName = document.createElement("h2")
        sightName.innerText = sightseeing.name

    let sightDesc = document.createElement("p")
        sightDesc.className = "desc"
        sightDesc.innerText = sightseeing.description

    let sightLoves = document.createElement("div")
        sightLoves.className = "loves-count"
        sightLoves.innerText = `${sightseeing.loves} loves`

    let btnContainer = document.createElement("div")
        btnContainer.className = "btn-container"

    let loveBtn = document.createElement("button")
          loveBtn.className = "love-btn"
          loveBtn.innerText = "♥️"

    let deleteBtn = document.createElement("button")
          deleteBtn.className = "delete"
          deleteBtn.innerText = "Delete"

    let addToFav = document.createElement("button")
        addToFav.className = "fav-btn"
        addToFav.innerText = "Add to favorite"

        btnContainer.append(loveBtn, deleteBtn, addToFav)

    // allSightsReviews.innerText = ""

    // allSightsReviews.className = "reviews"
    
    let reviewH5 = document.createElement("h5")
        reviewH5.id = "review-header"
        reviewH5.innerText = "Reviews"

    let reviewDiv = document.createElement("div")
        reviewDiv.className = "form-group"

    sightseeing.reviews.forEach((sight_review) => {
        createNewReview(sight_review, reviewDiv)
    })

    let reviewForm = document.createElement("form")
        reviewForm.id = "new-review"

    let reviewArea = document.createElement("textarea")
        reviewArea.className = "review-content"
        reviewArea.placeholder = "Write your review here..."
    
    let submitReview = document.createElement("button")
        submitReview.innerText = "submit"

    reviewForm.append(reviewArea, submitReview)
    reviewDiv.append(reviewForm)

    submitReview.addEventListener("click", (event) => {
        event.preventDefault()
        if (travelerInfo === undefined) {
            alert("Please log in")
            return 
        }
        let newReviewContent = reviewArea.value
        console.log(newReviewContent)
     
        fetch(`http://localhost:3000/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            review: newReviewContent,
            sightseeing_id: sightseeing.id,
            traveler_id: travelerInfo.id
          })
        })
        .then(res => res.json())
        .then((newReview) => {
            // console.log(newReview)
        //   shoe.reviews.push(newReview)
          createNewReview(newReview, reviewDiv)
          reviewForm.reset()
        })
      })


    sightCard.append(sightImg, sightName, sightDesc, sightLoves, btnContainer, reviewDiv) //likes, likeBtn, 
    sightContainer.append(sightCard)

    addToFav.addEventListener("click", () => {
        addToFavsFunc(sightseeing)
    })

    // increaseLikes(likeBtn, sightseeing, likes)
    increaseLove(loveBtn, sightseeing, sightLoves)
    deleteSight(deleteBtn, sightseeing, sightCard)
}

let createNewReview = (review, reviewDiv) => {
    console.log(review)

    let reviewSection = document.createElement("div")
        reviewSection.className = "review-section"

    let reviewContent = document.createElement("p")
        reviewContent.className = "review-content"
        reviewContent.innerText = `Comment: ${review.review}`

    reviewSection.append(reviewContent)
    reviewDiv.append(reviewSection)
  }

let createSightsFunc = (createSightBtn, location) => {
    createSightBtn.addEventListener("click", (evt) => {
        console.log(createSightBtn)
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
                loves: 0,
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






let increaseLove = (loveBtn, sightseeing, sightLoves) => {
    
    loveBtn.addEventListener("click", (e) => {

        let loveCounter = parseInt(sightLoves.innerText.split(" ")[0]) + 1

        console.log(loveCounter)

        fetch(`http://localhost:3000/sightseeings/${sightseeing.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify({
                loves: loveCounter
            })
        })
        .then(res => res.json())
        .then((updatedSight) => {
            sightLoves.innerText = parseInt(updatedSight.loves) + " " + "loves"
        })
    })
}

let deleteSight = (deleteBtn, sightseeing, sightCard) => {
    deleteBtn.addEventListener("click", (e) => {
        sightCard.remove()
        fetch(`http://localhost:3000/sightseeings/${sightseeing.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
    }) 
}


let addToFavsFunc = (sightseeing) => {
    if (travelerInfo === undefined) {
        alert("Please log in")
        return 
    }
    fetch(`http://localhost:3000/likes`, {
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            traveler_id: travelerInfo.id,
            sightseeing_id: sightseeing.id
        })
    })
    .then(res => res.json())
    .then(fav => {
        // console.log(fav)
        alert("Added to favorites")
        // console.log(favs)
    })
}

favorite.addEventListener("click", (e) => {
    if (travelerInfo === undefined) {
        alert("Please log in")
        return
    }
    displayFavs(travelerInfo)
})

let displayFavs = (travelerInfo) => {
    console.log(travelerInfo.likes)
    fetch(`http://localhost:3000/travelers/${travelerInfo.id}`)
        .then(res => res.json())
        .then(traveler => {
            main.innerHTML = ""
            traveler.likes.forEach((travelerFave)=>{
                createFave(travelerFave)
            })
        })
}

let createFave = (travelerFave) =>  {

    console.log("from createFunc", likes.sightseeing)

    likes.forEach(like => {
        let likeDiv = createElement("div")
            likeDiv.className
    })
}