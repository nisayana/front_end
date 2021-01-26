// const login = document.querySelector(".nav-link#login")
const fromContainer = document.querySelector("div#sign-up-form")

const navbar = document.querySelector(".navbar")
let userInfo

navbar.addEventListener("click", (evt) => {

    // main.className = "hide"

    if (evt.target.id == "login") {showLoginForm()}
})


let showSignUpForm = () => {
    locationDiv.innerText = ""
    main.innerText = ""

    let signUpForm = document.createElement('form')
        signUpForm.className = "sign-up-form"
    fromContainer.append(signUpForm)

    let heading = document.createElement("h2")
        heading.innerText = "Create an account"
    signUpForm.append(heading)

    let line = document.createElement('hr'); // linebreak
    signUpForm.appendChild(line);
    
    let linebreak = document.createElement('br'); // space
    signUpForm.appendChild(linebreak);
    
    let nameLabel = document.createElement('label'); // Full Name label
    nameLabel.innerHTML = "Full Name: ";
    signUpForm.appendChild(nameLabel);
    
    let nameInput = document.createElement('input'); // Full Name input
    nameInput.id = "fullname"
    signUpForm.appendChild(nameInput);
    
    let linebreak1 = document.createElement('br'); // space
    signUpForm.appendChild(linebreak1);
    
    let usernameLabel = document.createElement('label'); // Username label
    usernameLabel.innerHTML = "Username: "; // 
    signUpForm.appendChild(usernameLabel);
    
    let userNameInput = document.createElement('input'); // Username input
    userNameInput.id = "username"
    signUpForm.appendChild(userNameInput);

    let linebreak2 = document.createElement('br'); // space
    signUpForm.appendChild(linebreak2);

    let submitBtn = document.createElement('button'); // Append Submit Button
    submitBtn.type = "submit"
    submitBtn.className = "btn btn-primary btn-lg"
    submitBtn.id = 'sign-up-button'
    submitBtn.innerText = "Create Account"
    signUpForm.appendChild(submitBtn);

    main.append(fromContainer)
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
            userInfo = user
            // renderSightseeings()
        }
    })
}

// showLoginForm()