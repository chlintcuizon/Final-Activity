<?php
//process_registration.php

// Start a session to enable the use of session variables
session_start();

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

// Function to sanitize user input (preventing SQL injection and other attacks)
function sanitizeInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Initialize variables with empty values
$email = $name = $mobile = $password = $confirmPassword = "";
$errors = array();

// Validate and sanitize form data when the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize user inputs from the registration form
    $email = sanitizeInput($_POST["regEmail"]);
    $name = sanitizeInput($_POST["regName"]);
    $mobile = sanitizeInput($_POST["regMobile"]);
    $password = sanitizeInput($_POST["regPassword"]);
    $confirmPassword = sanitizeInput($_POST["regConfirmPassword"]);

    // Basic email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }

    // Additional validation rules for name, mobile, password, and confirm password can be added here

    // Check if passwords match
    if ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match";
    }

    // If there are no validation errors, proceed with database insertion
    if (empty($errors)) {
        // Hash the password before storing it in the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // SQL query to insert user data into the database
        $sql = "INSERT INTO users (email, name, mobile, password) VALUES ('$email', '$name', '$mobile', '$hashedPassword')";

        // Execute the SQL query
        if ($conn->query($sql) === TRUE) {
            // Redirect to the login form upon successful registration
            header("Location: index.html");
            exit();
        } else {
            // Display an error message if the database insertion fails
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        // If there are validation errors, store them in session and redirect back to the registration form
        $_SESSION['registration_errors'] = $errors;
        header("Location: registration_form.php");
        exit();
    }
}

// Close the database connection
$conn->close();
