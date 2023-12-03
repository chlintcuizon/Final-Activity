function validateForm() {
    var regEmail = document.getElementById('regEmail').value;
    var regName = document.getElementById('regName').value;
    var regMobile = document.getElementById('regMobile').value;
    var regPassword = document.getElementById('regPassword').value;
    var regConfirmPassword = document.getElementById('regConfirmPassword').value;

    // Basic form validation
    if (regEmail === "" || regName === "" || regMobile === "" || regPassword === "" || regConfirmPassword === "") {
        alert("Please fill in all fields");
        return false;
    }

    // Email validation using regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
        alert("Invalid email address");
        return false;
    }

    // Name validation using regex (Allow alphabets and spaces only)
    var nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(regName)) {
        alert("Invalid name. Please use alphabets and spaces only.");
        return false;
    }

    // Mobile validation using regex (Assuming a simple 11-digit format)
    var mobileRegex = /^\d{11}$/;
    if (!mobileRegex.test(regMobile)) {
        alert("Invalid mobile number.");
        return false;
    }

    // Password validation using regex (At least 8 characters, at least one uppercase letter, one lowercase letter, and one digit)
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(regPassword)) {
        alert("Invalid password. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.");
        return false;
    }

    // Password match validation
    if (regPassword !== regConfirmPassword) {
        alert("Password and Confirm Password do not match");
        return false;
    }

    // If no validation errors, show success alert
    alert("Register Success!");
    return true;
}
