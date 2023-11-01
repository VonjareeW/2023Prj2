//sign up function
function signUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        var signupStatus = document.getElementById("signupStatus");
        signupStatus.innerHTML = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

//sign in function
function signIn() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            window.location.href = data.redirectUrl;
        } else {
        var signInStatus = document.getElementById("signInStatus");
        signInStatus.innerHTML = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Logout function
function logout() {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message === 'Logout successful') {
            window.location.href = '/login';
        } else {
            console.error('Logout failed:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}