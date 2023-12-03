<?php
//delete_account.php
// Start or resume the session
session_start();

// Database connection parameters
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'final';

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the AJAX request
$confirmDeletePassword = $_POST['confirmDeletePassword'];

try {
    // Retrieve the user ID from the session
    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];

        // Check if the entered password matches the one in the database
        $checkPasswordSql = "SELECT password FROM users WHERE id=$user_id";
        $result = $conn->query($checkPasswordSql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $storedPassword = $row['password'];

            // Verify the entered password
            if (password_verify($confirmDeletePassword, $storedPassword)) {
                // Delete the user account from the database
                $deleteAccountSql = "DELETE FROM users WHERE id=$user_id";

                // Check if the account deletion query was successful
                if ($conn->query($deleteAccountSql) === TRUE) {
                    echo "Account deleted successfully";
                    // You can also unset or destroy the session here
                } else {
                    throw new Exception("Error deleting account: " . $conn->error);
                }
            } else {
                throw new Exception("Incorrect password");
            }
        } else {
            throw new Exception("User not found");
        }
    } else {
        throw new Exception("User not authenticated");
    }
} catch (Exception $e) {
    // Output an error message if an exception occurs
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn->close();
