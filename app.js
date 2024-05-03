document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form data
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Create a user object
    var newUser = {
        username: username,
        email: email,
        password: password
    };

    // Fetch existing users from local storage
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    var existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert('A user with this email already exists!');
        return; // Stop the function here if user exists
    }

    // Add new user to the array
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Simulate an AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/users', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Success:', xhr.responseText);
        } else {
            console.error('Something went wrong.');
        }
    };
    xhr.send(JSON.stringify(newUser));

    // Optionally clear the form or give feedback
    document.getElementById('registrationForm').reset();
    alert('User registered successfully!');
});
