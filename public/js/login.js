// handles user login: add log in timestamp to db, then reroute to home page
const login = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

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
};

// handles user sign up: add user to db, then reroute to home page
const signUp = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up. Please try again.');
        }
    }
};

document.querySelector('#login-btn').addEventListener('click', login);
document.querySelector('#signup-btn').addEventListener('click', signUp);