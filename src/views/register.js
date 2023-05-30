import { register } from '../services/apiService.js';

export default {
    render: async () => {
        let formContainer = document.createElement('div');
        formContainer.setAttribute('id', 'form-container');

        let title = document.createElement('h1');
        title.innerText = "Inscription";
        formContainer.appendChild(title);

        let form = document.createElement('form');
        form.setAttribute('id', 'registerForm');

        let emailLabel = document.createElement('label');
        emailLabel.setAttribute('for', 'email');
        emailLabel.innerText = "Email:";
        let emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('id', 'email');
        emailInput.setAttribute('name', 'email');
        emailInput.required = true;

        let passwordLabel = document.createElement('label');
        passwordLabel.setAttribute('for', 'password');
        passwordLabel.innerText = "Password:";
        let passwordInput = document.createElement('input');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('id', 'password');
        passwordInput.setAttribute('name', 'password');
        passwordInput.required = true;

        let submitInput = document.createElement('input');
        submitInput.setAttribute('type', 'submit');
        submitInput.setAttribute('value', 'Register');

        form.appendChild(emailLabel);
        form.appendChild(document.createElement('br')); 
        form.appendChild(emailInput);
        form.appendChild(document.createElement('br')); 
        form.appendChild(passwordLabel);
        form.appendChild(document.createElement('br')); 
        form.appendChild(passwordInput);
        form.appendChild(document.createElement('br')); 
        form.appendChild(submitInput);

        let messageDiv = document.createElement('div');
        messageDiv.setAttribute('id', 'message');

        let loginLink = document.createElement('a');
        loginLink.setAttribute('href', '/connexion');
        loginLink.innerText = "Déjà inscrit ? Cliquez ici pour vous connecter !";
        loginLink.classList.add('internal-link');

        formContainer.appendChild(form);
        formContainer.appendChild(messageDiv);
        formContainer.appendChild(loginLink);

        return formContainer.outerHTML;
    },

    afterRender: async () => {
        document.getElementById('registerForm').addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await register(email, password);
            console.log(response);

            const messageElement = document.getElementById("message");
            if (response.error === 'Validation error') {
                messageElement.textContent = 'Le mot de passe doit faire au moins 8 caractères.';
            }
            else if (response.error === 'An account with this email already exists') {
                messageElement.textContent = 'Cet email est déjà enregistré, veuillez essayer un autre.';
            }
            else {
                messageElement.textContent = 'Inscription réussite.';
                window.location.href = '/';
            }
        });
    }
}
