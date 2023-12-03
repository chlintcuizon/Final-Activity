<?php
// update_password.php

session_start(); // Start the session

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'final';

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the AJAX request
$oldPassword = $_POST['oldPassword'];
$newPassword = $_POST['newPassword'];

try {
    // Retrieve the user ID from the session
    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];

        // Check if the old password matches the one in the database
        $checkPasswordSql = "SELECT password FROM users WHERE id=$user_id";
        $result = $conn->query($checkPasswordSql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $storedPassword = $row['password'];

            // Verify the old password
            if (password_verify($oldPassword, $storedPassword)) {
                // Update the user password in the database
                $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                $updatePasswordSql = "UPDATE users SET password='$hashedPassword' WHERE id=$user_id";

                if ($conn->query($updatePasswordSql) === TRUE) {
                    echo "Password updated successfully";
                } else {
                    throw new Exception("Error updating password: " . $conn->error);
                }
            } else {
                throw new Exception("Incorrect current password");
            }
        } else {
            throw new Exception("User not found");
        }
    } else {
        throw new Exception("User not authenticated");
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn->close();
