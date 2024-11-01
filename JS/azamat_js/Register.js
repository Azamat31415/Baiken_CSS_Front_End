document.getElementById('submit-btn').addEventListener('click', function(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const nameError = document.getElementById('name-error');
    const surnameError = document.getElementById('surname-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    function validateField(field, errorMessage) {
        if (field.value.trim() === "") {
            field.classList.add('error');
            errorMessage.style.display = "block";
            errorMessage.textContent = "This field is required";
            return false;
        } else {
            field.classList.remove('error');
            errorMessage.style.display = "none";
            return true;
        }
    }

    function validateEmail(emailField, errorMessage) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
            emailField.classList.add('error');
            errorMessage.style.display = "block";
            errorMessage.textContent = "Please enter a valid email (must contain @)";
            return false;
        } else {
            emailField.classList.remove('error');
            errorMessage.style.display = "none";
            return true;
        }
    }

    function validatePassword(passwordField, errorMessage) {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordPattern.test(passwordField.value.trim())) {
            passwordField.classList.add('error');
            errorMessage.style.display = "block";
            errorMessage.textContent = "Password must contain at least one uppercase letter and one number";
            return false;
        } else {
            passwordField.classList.remove('error');
            errorMessage.style.display = "none";
            return true;
        }
    }

    const isNameValid = validateField(name, nameError);
    const isSurnameValid = validateField(surname, surnameError);
    const isEmailValid = validateEmail(email, emailError);
    const isPasswordValid = validatePassword(password, passwordError);

    if (isNameValid && isSurnameValid && isEmailValid && isPasswordValid) {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        const userExists = registeredUsers.some(user => user.email === email.value.trim());
        if (userExists) {
            showAlert("User already exists. Please use a different email.");
            return;
        }

        const newUser = {
            name: name.value.trim(),
            surname: surname.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        showAlert("Registration successful!", () => {
            window.location.href = "Login.html";
        });
    }
});

function showAlert(message, callback) {
    const alertBox = document.getElementById('registerAlert');
    alertBox.querySelector('p').textContent = message;
    alertBox.style.display = 'flex';

    alertBox.querySelector('button').onclick = () => {
        alertBox.style.display = 'none';
        if (callback) callback();
    };
}