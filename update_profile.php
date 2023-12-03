<?php
// update_profile.php

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

    // Get other form data
    $name = $_POST['name'];
    $newEmail = $_POST['newEmail'];
    $newMobile = $_POST['newMobile'];

    // Query to update user details based on the email
    $updateSql = "UPDATE users SET ";

    if (!empty($name)) {
        $updateSql .= "name = '$name', ";
    }

    if (!empty($newEmail)) {
        $updateSql .= "email = '$newEmail', ";

        // Update the session variable with the new email
        $_SESSION['user_email'] = $newEmail;
    }

    if (!empty($newMobile)) {
        $updateSql .= "mobile = '$newMobile', ";
    }

    // Remove the trailing comma and space from the query
    $updateSql = rtrim($updateSql, ', ');

    // Add the WHERE clause
    $updateSql .= " WHERE email = '$user_email'";

    if ($conn->query($updateSql) === TRUE) {
        echo "Profile updated successfully";
    } else {
        echo "Error updating profile: " . $conn->error;
    }

    // Close the database connection
    $conn->close();
} else {
    // User is not logged in
    echo "User not authenticated";
}
