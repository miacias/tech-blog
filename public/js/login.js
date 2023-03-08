const loginForm = document.querySelector('#login-btn');
const signupForm = document.querySelector('#signup-btn');

// handles user login: add log in timestamp to db, then reroute to home page
const login = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // checks username with DB
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in. Please try again.');
        }
    }
    loginForm.reset();
};

// handles user sign up: add user to db, then reroute to home page
const signUp = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // verifies fields were provided, then sends post route to back-end
    // const newUser = {
    //     username: username,
    //     password: password
    // };
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            // body: JSON.stringify(newUser),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            console.log('new acct created');
            document.location.replace('/');
        } else {
            alert('Failed to sign up. Please try again.');
        }
    }
    signupForm.reset();
};

loginForm.addEventListener('submit', login);
signupForm.addEventListener('submit', signUp);