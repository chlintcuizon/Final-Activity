//myaccount.js

// Execute the following code when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Set up event listeners for each form's submit button
    setupUpdateProfileEvent();
    setupUpdatePasswordEvent();
    setupDeleteAccountEvent();
    displayCurrentUserDetails(); // Display user details initially after login
});

// Function to fetch and display the current user's details
function displayCurrentUserDetails() {
    // Make AJAX request to get_current_user.php
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_current_user.php', true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            // Handle the response from the server
            var response = JSON.parse(xhr.responseText);
            console.log(response);

            // Update the spans with the current user's details
            document.getElementById('currentUserName').textContent = response.name;
            document.getElementById('currentUserEmail').textContent = response.email;
            document.getElementById('currentUserMobile').textContent = response.mobile;
        }
    };

    // Send the request
    xhr.send();
}

// Rest of your code remains unchanged...


// Function to fetch and display the current user's name
function displayCurrentUserName() {
    // Get the span element for displaying the user's name
    var currentUserNameSpan = document.getElementById('currentUserName');

    // Make AJAX request to get_current_user.php
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_current_user.php', true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            // Handle the response from the server
            var response = JSON.parse(xhr.responseText);
            console.log(response);

            // Update the span with the current user's name
            currentUserNameSpan.textContent = response.name;
        }
    };

    // Send the request
    xhr.send();
}

// Function to fetch and display the current user's email
function displayCurrentUserEmail() {
    // Get the span element for displaying the user's email
    var currentUserEmailSpan = document.getElementById('currentUserEmail');

    // Make AJAX request to get_current_user.php
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_current_user.php', true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            // Handle the response from the server
            var response = JSON.parse(xhr.responseText);
            console.log(response);

            // Update the span with the current user's email
            currentUserEmailSpan.textContent = response.email;
        }
    };

    // Send the request
    xhr.send();
}

// Function to fetch and display the current user's mobile number
function displayCurrentUserMobile() {
    // Get the span element for displaying the user's mobile number
    var currentUserMobileSpan = document.getElementById('currentUserMobile');

    // Make AJAX request to get_current_user.php
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_current_user.php', true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            // Handle the response from the server
            var response = JSON.parse(xhr.responseText);
            console.log(response);

            // Update the span with the current user's mobile number
            currentUserMobileSpan.textContent = response.mobile;
        }
    };

    // Send the request
    xhr.send();
}

// Function to set up the event listener for the Delete Account button
function setupDeleteAccountEvent() {
    // Get the Delete Account button element
    var deleteAccountBtn = document.getElementById('deleteAccountBtn');

    // Add a click event listener to the Delete Account button
    deleteAccountBtn.addEventListener('click', function () {
        // Ask for confirmation before proceeding
        var confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (confirmDelete) {
            // Get form data
            var confirmDeletePassword = document.getElementById('confirmDeletePassword');

            // Validate input field
            if (confirmDeletePassword.value.trim() === '') {
                alert('Please enter your password to confirm account deletion.');
                return;
            }

            // Create FormData object
            var formData = new FormData();
            formData.append('confirmDeletePassword', confirmDeletePassword.value);

            // Make AJAX request to delete_account.php
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'delete_account.php', true);

            xhr.onload = function () {
                if (xhr.status == 200) {
                    // Handle the response from the server
                    var response = xhr.responseText;
                    console.log(response);
                    if (response === "Account deleted successfully") {
                        alert('Account deleted successfully!');
                        // Redirect the user to a logout page or home page
                        window.location.href = 'index.html';
                    } else {
                        alert('Error deleting account: ' + response);
                    }
                }
            };

            // Send the request with form data
            xhr.send(formData);
        }
    });
}

// Function to set up the event listener for the Update Profile button
function setupUpdateProfileEvent() {
    // Get the Update Profile button element
    var updateProfileBtn = document.getElementById('updateProfileBtn');

    // Add a click event listener to the Update Profile button
    updateProfileBtn.addEventListener('click', function () {
        // Get form data
        var name = document.getElementById('name');
        var newEmail = document.getElementById('newEmail');
        var newMobile = document.getElementById('newMobile');

        // Validate input fields
        if (
            name.value.trim() === '' &&
            newEmail.value.trim() === '' &&
            newMobile.value.trim() === ''
        ) {
            alert('Name, email, and mobile number cannot be all empty.');
            return;
        }

        // Validate email format using regex if not empty
        if (newEmail.value.trim() !== '') {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newEmail.value.trim())) {
                alert('Invalid email format.');
                return;
            }
        }

        // Validate name format using regex if not empty
        if (name.value.trim() !== '') {
            var nameRegex = /^[a-zA-Z-' ]+$/;
            if (!nameRegex.test(name.value.trim())) {
                alert('Invalid name format.');
                return;
            }
        }

        // Validate mobile number format using regex if not empty
        if (newMobile.value.trim() !== '') {
            var mobileRegex = /^[0-9]{11}$/;
            if (!mobileRegex.test(newMobile.value.trim())) {
                alert('Invalid mobile number format.');
                return;
            }
        }

        // Create FormData object
        var formData = new FormData();

        // Append fields to FormData regardless of whether they are empty or not
        formData.append('name', name.value);
        formData.append('newEmail', newEmail.value);
        formData.append('newMobile', newMobile.value);

        // Make AJAX request to update_profile.php
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'update_profile.php', true);

        xhr.onload = function () {
            if (xhr.status == 200) {
                // Handle the response from the server
                var response = xhr.responseText;
                console.log(response);
                if (response === "Profile updated successfully") {
                    alert('Profile updated successfully!');
                    // Update the displayed user details after successful update
                    displayCurrentUserDetails();
                } else {
                    alert('Error updating profile: ' + response);
                }
            }
        };

        // Send the request with form data
        xhr.send(formData);
    });
}


// Function to set up the event listener for the Update Password button
function setupUpdatePasswordEvent() {
    // Get the Update Password button element
    var updatePasswordBtn = document.getElementById('updatePasswordBtn');

    // Add a click event listener to the Update Password button
    updatePasswordBtn.addEventListener('click', function () {
        // Get form data
        var oldPassword = document.getElementById('oldPassword');
        var newPassword = document.getElementById('newPassword');
        var confirmPassword = document.getElementById('confirmPassword');

        // Validate input fields
        if (oldPassword.value.trim() === '' || newPassword.value.trim() === '' || confirmPassword.value.trim() === '') {
            alert('All password fields must be filled.');
            return;
        }

        // Check if new password and confirm password match
        if (newPassword.value !== confirmPassword.value) {
            alert('New password and confirm password must match.');
            return;
        }

        // Create FormData object
        var formData = new FormData();
        formData.append('oldPassword', oldPassword.value);
        formData.append('newPassword', newPassword.value);

        // Make AJAX request to update_password.php
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'update_password.php', true);

        xhr.onload = function () {
            if (xhr.status == 200) {
                // Handle the response from the server
                var response = xhr.responseText;
                console.log(response);
                if (response === "Password updated successfully") {
                    alert('Password updated successfully!');
                    // Clear the input fields
                    oldPassword.value = '';
                    newPassword.value = '';
                    confirmPassword.value = '';
                } else {
                    alert('Error updating password: ' + response);
                }
            }
        };

        // Send the request with form data
        xhr.send(formData);
    });
}
