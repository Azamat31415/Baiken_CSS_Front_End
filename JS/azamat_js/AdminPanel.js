let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
let selectedUser = null;

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
            openEditUserAlert(email);
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

    function openEditUserAlert(email) {
        selectedUser = registeredUsers.find(user => user.email === email);
    
        if (selectedUser) {
            document.getElementById('editName').value = selectedUser.name;
            document.getElementById('editSurname').value = selectedUser.surname;
            document.getElementById('editEmail').value = selectedUser.email;
            document.getElementById('editUserAlert').style.display = 'flex';
        }
    }

    window.saveUserChanges = function() {
        if (selectedUser) {
            selectedUser.name = document.getElementById('editName').value.trim();
            selectedUser.surname = document.getElementById('editSurname').value.trim();
            selectedUser.email = document.getElementById('editEmail').value.trim();
    
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            populateUserTable();
            closeAlert('editUserAlert');
        }
    };

    populateUserTable();
});

function closeAlert(alertId) {
    document.getElementById(alertId).style.display = 'none';
}

/*
document.addEventListener("DOMContentLoaded", function() {
    const tableContainer = document.querySelector("main");
    const textElement = document.createElement("p");

    textElement.textContent = "Some text under this table";
    textElement.style.marginTop = "20px";
    tableContainer.appendChild(textElement);
});

document.addEventListener("DOMContentLoaded", function() {
    const tableContainer = document.querySelector("main");
    const circle = document.createElement("div");

    circle.style.width = "100px";
    circle.style.height = "100px";
    circle.style.backgroundColor = "blue";
    circle.style.borderRadius = "50%";
    circle.style.mardingtop = "20px";
    circle.style.transition = "transform 0.3s ease";

    tableContainer.appendChild(circle);

    circle.addEventListener("mouseover", function() {
        circle.style.transform = "scale(1.3)";
    });

    circle.addEventListener("mouseout", function() {
        circle.style.transform = "scale(1)";
    })
});

document.addEventListener("DOMContentLoaded", function() {
    const tableContainer = document.querySelector("main");
    const button = document.createElement("button");

    button.textContent = "Button";
    button.style.padding = "10px 20px";
    button.style.marginTop = "20px";
    button.style.backgroundColor = "green";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.transition = "background-color 0.3s ease";

    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "center";
    tableContainer.style.alignItems = "center";

    tableContainer.appendChild(button);

    button.addEventListener("mouseover", function() {
        button.style.backgroundColor = "red";
    });

    button.addEventListener("mouseout", function() {
        button.style.backgroundColor = "green";
    });
}); 
*/