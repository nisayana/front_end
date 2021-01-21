// let addSights = false
const locationCollection = document.querySelector(".location-collection")
const createSightseeingButton = document.querySelector(".formbtn")
const sightsForm = document.querySelector(".add-sights-form")
const formDiv = document.querySelector(".form-container")
const sightseeingContainer = document.querySelector(".sightseeing-container")



fetch("http://localhost:3000/locations")
.then(res => res.json())
.then((arrayOfLocations) => {
    arrayOfLocations.forEach((location) => {
        // console.log(location)
        renderLocation(location)
    })
})

let renderLocation = (location) => {

    createSightseeingButton.classList.add("hide")

    let locationDiv = document.createElement("div")
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
    locationCollection.append(locationDiv)

    renderSightseeings(locationImg, location, locationCollection)
}


let renderSightseeings = (locationImg, location, locationCollection) => {
    if (locationImg) {
        locationImg.addEventListener("click", (evt) => {
            locationCollection.classList.add("hide")
            createSightseeingButton.classList.remove("hide")
            location.sightseeings.forEach((sightseeing) => {
                sightseeingCardFunc(sightseeing, locationCollection)
                
            })
            createSightsFunc(location)
        }) 
    }   
}



let sightseeingCardFunc = (sightseeing, locationCollection) => {
    // debugger
    console.log(sightseeing)
    let sightseeingCard = document.createElement("div")

    let imageTag = document.createElement("img")
        imageTag.src = sightseeing.image_url
        imageTag.classList.add("sightseeing-pic")

    let sightseeingName = document.createElement("h2")
        sightseeingName.innerText = sightseeing.name

    let sightseeingDescription = document.createElement("p")
        sightseeingDescription.className = "desc"
        sightseeingDescription.innerText = sightseeing.description

    const deleteButton = document.createElement("button")
          deleteButton.className = "delete"
          deleteButton.innerText = "delete"

    const likes = document.createElement("div")
          likes.innerText = `${sightseeing.likes.length} ♥️`

    const likeButton = document.createElement("button")
          likeButton.className = "like-btn"
        //   likeButton.classList.add("like")
          likeButton.innerText = "♥️"

    // debugger

    // const editButton = document.createElement("button")
    //       editButton.innerText = "edit"
    //       editButton.className = "edit-delete"


    sightseeingCard.append(imageTag, sightseeingName, sightseeingDescription, likes, likeButton, deleteButton) //editButton
    sightseeingContainer.append(sightseeingCard)

    // console.log(userInfo)

    increaseLikes(likeButton, sightseeing, likes)
    deleteSightseeing(deleteButton, sightseeing, sightseeingCard)
    // editForm(editButton, sightseeingDescription, sightseeing, sightseeingCard)
}

let createSightsFunc = (location) => {
    createSightseeingButton.addEventListener("click", (evt) => {
    sightseeingContainer.classList.add("hide")

    const form = document.createElement("form")
          form.className = "form"

    const inputName = document.createElement("input")
    
    const br = document.createElement("br")
    form.appendChild(br)
    
    const label1 = document.createElement("label")
          label1.for = "lname"
          label1.innerText = "Name: "
          inputName.type = "text"
          inputName.name = "lname"
          inputName.placeholder= "Sightseeing name"


    const br1 = document.createElement("br")
    form.appendChild(br1)
    
    const inputDesc = document.createElement("textarea")
          inputDesc.style.height = "200px"
          inputDesc.style.width = "200px"

    const label2 = document.createElement("label")
          label2.for = "desc"
          label2.innerText = "Description: "
          inputDesc.type = "text"
          inputDesc.name = "desc"
          inputDesc.placeholder= "sightseeing desc"


    const br2 = document.createElement("br")
    form.appendChild(br2)
    
    const inputImage = document.createElement("input")
    const label3 = document.createElement("label")
          label3.for = "image"
          label3.innerText = "Image-url: "
          inputImage.type = "text"
          inputImage.name = "image_url"
          inputImage.placeholder= "Image url"

    let submitButton = document.createElement("button")
        submitButton.classList.add("submit-btn")
        submitButton.innerText = "Submit"

    form.append(inputName, inputImage, inputDesc, submitButton)
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
            sightseeingCardFunc(newSights)
            form.innerHTML = ""
            formDiv.classList.add("hide")
        })
    })
  })
}

function increaseLikes (likeButton, sightseeing, likes) {
    // console.log("from LIKE", likes)
    // let likeNum = 0
    likeButton.addEventListener("click", (e) => {
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

function deleteSightseeing (deleteButton, sightseeing, sightseeingCard){
    deleteButton.addEventListener("click", (e) => {
        sightseeingCard.remove()
        fetch(`http://localhost:3000/sightseeings/${sightseeing.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
    }) 
}


// function editForm(editButton, sightsDesc, sightseeing, sightseeingCard){
//     editButton.addEventListener("click", (evt) => {
//       // debugger
//         if (editButton.disabled === false){ 
//           const editForm = document.createElement("form");
//           editForm.innerHTML = `<textarea rows="4" cols="50" type="text" name="description"
//           placeholder= "edit this description...."></textarea><br>
//           <input type="submit" value="Submit">`
//           sightsDesc.append(editForm)
  
//           editForm.addEventListener("submit", (evt) => {
//             evt.preventDefault()
//             let newDesc = evt.target["description"].value
  
//             fetch(`http://localhost:3000/sightseeings/${sightseeing.id}`, {
//               method: "PATCH",
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                description: newDesc
//               })
//             })
//             .then(resp => resp.json())
//             .then((updatedSightsObj) => {
//               sightsDesc.innerText = updatedSightsObj.description
//               editButton.disabled = false;
//             })
//           })
//           editButton.disabled = true;
//         } 
//       })
//     } 
