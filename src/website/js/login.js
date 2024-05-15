document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (password === 'ISRP$$21') {
        window.location.href = '/dashboard-DFRRP5ZN7L?username=' + encodeURIComponent(username);
    } else {
        document.getElementById('error-message').textContent = 'Invalid password.';
    }
});