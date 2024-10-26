let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

document.addEventListener('DOMContentLoaded', function() {
    const userTableBody = document.getElementById('user-table-body');

    function populateUserTable() {
        userTableBody.innerHTML = '';

        registeredUsers.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-warning edit-user" data-email="${user.email}">Edit</button>
                    <button class="btn btn-danger delete-user" data-email="${user.email}">Delete</button>
                </td>
            `;

            userTableBody.appendChild(row); 
        });
    }

    userTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-user')) {
            const email = event.target.getAttribute('data-email');
            deleteUser(email);
        } else if (event.target.classList.contains('edit-user')) {
            const email = event.target.getAttribute('data-email');
            editUser(email);
        }
    });

    function deleteUser(email) {
        const userIndex = registeredUsers.findIndex(user => user.email === email);

        if (userIndex !== -1) {
            registeredUsers.splice(userIndex, 1);
            
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            populateUserTable();
            
            alert("User deleted successfully!");
        } else {
            alert("User not found!");
        }
    }

    function editUser(email) {
        const user = registeredUsers.find(user => user.email === email);
        const newName = prompt("Enter new name:", user.name);
        const newSurname = prompt("Enter new surname:", user.surname);
        const newEmail = prompt("Enter new email:", user.email);

        if (newName && newSurname && newEmail) {
            user.name = newName;
            user.surname = newSurname;
            user.email = newEmail;

            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            populateUserTable();
        }
    }

    populateUserTable();
});