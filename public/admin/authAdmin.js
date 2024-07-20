// Check if user is logged in and not an admin
if (localStorage.getItem('token')) {
    if (localStorage.getItem('role') !== '2') {   // 2 is the role for admin
        window.location.href = '/home.html'; // Redirect to non-admin home page
    }
}
else{
    window.location.href = '/login.html'; // Redirect to login page
}

// Function to handle logout
function logout() {
    // Clear the authentication token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('accountNo');
    localStorage.removeItem('role');

    // Redirect the user to the login page or any other desired page
    window.location.href = '/login.html';
}
