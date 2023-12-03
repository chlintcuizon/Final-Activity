document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginButton").addEventListener("click", function () {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        // Basic validation - you may add more validation if needed
        if (email === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }

        // Make an AJAX request to the login.php script
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "login.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert("Login successful");
                    window.location.href = "indexhp.html"; // Redirect to the dashboard
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            }
        };

        // Send the data to login.php
        var data = "email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
        xhr.send(data);
    });

});

