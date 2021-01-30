// const login = document.querySelector(".nav-link#login")
const formContainer = document.querySelector("div#sign-up-form")

const navbar = document.querySelector(".navbar")
let travelerInfo

navbar.addEventListener("click", (evt) => {

    // main.className = "hide"

    if (evt.target.id == "login") {showLoginForm()}
    if (evt.target.id == "signup") {showSignUpForm()}
    if (evt.target.id == "home") {renderLocation()}

})


let showSignUpForm = () => {
    // locationDiv.innerText = ""
    main.innerText = ""

    let signUpForm = document.createElement('form')
        signUpForm.className = "sign-up-form"

    let heading = document.createElement("h2")
        heading.innerText = "Create an account"

    let line = document.createElement('hr'); // linebreak
    
    let linebreak = document.createElement('br'); // space
    
    let nameLabel = document.createElement('label'); // Full Name label
    nameLabel.innerHTML = "Name: ";
    
    let nameInput = document.createElement('input'); // Full Name input
    nameInput.id = "name"
    
    let linebreak1 = document.createElement('br'); // space
    
    let usernameLabel = document.createElement('label'); // Username label
    usernameLabel.innerHTML = "Username: "; // 
    
    let userNameInput = document.createElement('input'); // Username input
    userNameInput.id = "username"

    let linebreak2 = document.createElement('br'); // space

    let submitBtn = document.createElement('button'); // Append Submit Button
    submitBtn.type = "submit"
    submitBtn.className = "btn btn-primary btn-lg"
    submitBtn.id = 'sign-up-button'
    submitBtn.innerText = "Create Account"

    signUpForm.append(heading, line, linebreak, nameLabel, nameInput, linebreak1, usernameLabel, userNameInput, userNameInput, submitBtn);
    main.append(signUpForm)

    // main.append(formContainer)
    signUpForm.addEventListener("submit", handleSignUpForm)
        
}

let handleSignUpForm = (evt) => {
    evt.preventDefault()
    let newName = evt.target["name"].value
    
}

let showLoginForm = () => {
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
    .then(user => {
        if (user.id) {
            console.log(user)
            travelerInfo = user
            // renderSightseeings()
        }
    })
}

// showLoginForm()