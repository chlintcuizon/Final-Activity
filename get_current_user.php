<?php
// get_current_user.php

// Start the session
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_email'])) {
    // Database connection details
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'final';

    // Create a new MySQLi connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check if the connection to the database was successful
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get the user email from the session variable
    $user_email = $_SESSION['user_email'];

    // Query to get user details based on the email
    $sql = "SELECT * FROM users WHERE email = '$user_email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch the user details
        $user_details = $result->fetch_assoc();

        // Return user details as JSON
        echo json_encode($user_details);
    } else {
        // User not found in the database
        echo json_encode(["error" => "User not found"]);
    }

    // Close the database connection
    $conn->close();
} else {
    // User is not logged in
    echo json_encode(["error" => "User not authenticated"]);
}
