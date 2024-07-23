function initializeUsers() {
    var users = localStorage.getItem('users');
    if (users) {
        return JSON.parse(users);
    } else {
        var defaultUsers = [
            { username: "user1@example.com", password: "Password1" },
            { username: "user2@example.com", password: "Password2" }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
}

var existingUsers = initializeUsers();

function openModal(message, modalId, messageId) {
    var modal = document.getElementById(modalId);
    var messageElement = document.getElementById(messageId);
    messageElement.innerHTML = message;
    modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

document.querySelectorAll('.close').forEach(function (closeButton) {
    closeButton.onclick = function() {
        var modal = closeButton.parentElement.parentElement;
        modal.style.display = "none";
    };
});

window.onclick = function(event) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
};

function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = '';

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(username)) {
        errorMessage += '<p>Invalid email format</p>';
    }

    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
        errorMessage += '<p>Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit</p>';
    }

    if (!errorMessage) {
        var userFound = false;
        for (var i = 0; i < existingUsers.length; i++) {
            if (existingUsers[i].username === username) {
                userFound = true;
                if (existingUsers[i].password === password) {
                    // Redirect to home page
                    window.location.href = 'departments.html';
                    return false; // Prevent form submission
                } else {
                    errorMessage += '<p>Incorrect password</p>';
                }
            }
        }
        if (!userFound) {
            errorMessage += '<p>Username does not exist. <a href="signup.html">Sign up here</a></p>';
        }
    }

    openModal(errorMessage, 'errorModal', 'error-message');
    return false;
}

function validateSignupForm() {
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;
    var errorMessage = '';

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newUsername)) {
        errorMessage += '<p>Invalid email format</p>';
    }

    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(newPassword)) {
        errorMessage += '<p>Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit</p>';
    }

    for (var i = 0; i < existingUsers.length; i++) {
        if (existingUsers[i].username === newUsername) {
            errorMessage += '<p>Username already exists</p>';
            break;
        }
    }

    if (errorMessage) {
        openModal(errorMessage, 'signupErrorModal', 'signup-error-message');
        return false;
    }

    existingUsers.push({ username: newUsername, password: newPassword });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    window.location.href = 'login.html';
    return false;
}
