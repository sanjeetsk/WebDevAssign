let isLoggedIn = false;

function signup(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");


    //Validate inputs

    if (firstName.trim() === "") {
        errorMessage.innerText = "Please enter your firstName.";
        return;
    }
    if (lastName.trim() === "") {
        errorMessage.innerText = "Please enter your lastName.";
        return;
    }
    if (email.trim() === "" || !isValidEmail(email)) {
        errorMessage.innerText = "Please enter a valid email address.";
        return;
    }
    
    if (password.length < 8) {
        errorMessage.innerText = "Password must be at least 8 characters long.";
        return;
    }

    //Create user
    const user = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName 
    };

    //Get users from local storage or create empty array
    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

    //Check if user with the same email aready exists
    if (users.some(u => u.email === email)) {
        errorMessage.innerText = "User with this email already exists.";
        return;
    }

    //Add new user to array
    users.push(user);

    //Save updated users to local storage
    localStorage.setItem("users", JSON.stringify(users));

    //Redirect to login page
    window.location.href = "./signIn.html";
}


function isValidEmail(email) {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}