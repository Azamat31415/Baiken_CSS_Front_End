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

    const isNameValid = validateField(name, nameError);
    const isSurnameValid = validateField(surname, surnameError);
    const isEmailValid = validateField(email, emailError);
    const isPasswordValid = validateField(password, passwordError);

    if (isNameValid && isSurnameValid && isEmailValid && isPasswordValid) {
        let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        
        const emailExists = registeredUsers.some(user => user.email === email.value.trim());

        console.log('Registered Users:', registeredUsers);
        console.log('Email exists:', emailExists);

        if (emailExists) {
            alert("This email is already registered.");
        } else {
            registeredUsers.push({
                name: name.value.trim(),
                surname: surname.value.trim(),
                email: email.value.trim(),
                password: password.value.trim()
            });

            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            alert("Registration successful!");
            window.location.href = 'Login.html';
        }
    }
});
