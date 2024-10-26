document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "Login.html";
    } else {
        const user = JSON.parse(currentUser);
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-surname').textContent = user.surname;
        document.getElementById('profile-email').textContent = user.email;
        document.getElementById('profile-password').textContent = user.password; 
    }

    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem("currentUser");
        window.location.href = "Login.html";
    });
});
