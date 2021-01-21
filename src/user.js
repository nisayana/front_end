// const login = document.querySelector(".nav-link#login")

// console.log(login)

const main = document.querySelector(".main")
const navbar = document.querySelector(".navbar")
let userInfo = ""

navbar.addEventListener("click", (evt) => {

    // main.className = "hide"

    if (evt.target.id == "login") {showLoginForm()}
})

showLoginForm = () => {
    // login.innerHTML = ""

    let loginForm = document.createElement("form")
        loginForm.classList.add("form")

    let usernameDiv = document.createElement("div")
        usernameDiv.className = "form-group"
    let usernameLabel = document.createElement("label")
        usernameLabel.htmlFor = "username"
        usernameLabel.innerText = "Username"

    let usernameInput = document.createElement("input")
        usernameInput.type = "text"
        usernameInput.className = "form-control"
        usernameInput.id = "username"
        usernameInput.placeholder = "Enter username"
        usernameInput.autocomplete = "off"

    usernameDiv.append(usernameLabel, usernameInput)

    let submitButton = document.createElement("button")
        submitButton.type = "submit"
        submitButton.className = "btn btn-primary"
        submitButton.innerText = "Login"

    loginForm.append(usernameDiv, submitButton)

    login.append(loginForm)
    loginForm.addEventListener("submit", handleLoginForm)
}

let handleLoginForm = (evt) => {
    // debugger
    evt.preventDefault()
    let loggedInUser = evt.target.username.value

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify({
            username: loggedInUser
        })
    })
    .then(res => res.json())
    .then(response => {
        userInfo = response
        // renderSightseeings()
    })
}

// showLoginForm()