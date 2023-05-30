import { login } from '../services/apiService.js';
import getCookie from '../utils/getCookie.js';

const API_URL = 'http://ecodiet.cluster-ig3.igpolytech.fr';
// const API_URL = 'http://localhost:3000'

export default {
    render: async () => {
        // Create a form-container div
        let formContainer = document.createElement('div');
        formContainer.setAttribute('id', 'form-container');

        // Add a title
        let title = document.createElement('h1');
        title.innerText = "Connexion";
        formContainer.appendChild(title);

        // Create form element
        let form = document.createElement('form');
        form.setAttribute('id', 'loginForm');

        // Create email label and input field
        let emailLabel = document.createElement('label');
        emailLabel.setAttribute('for', 'email');
        emailLabel.innerText = "Email:";
        let emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('id', 'email');
        emailInput.setAttribute('name', 'email');
        emailInput.required = true;

        // Create password label and input field
        let passwordLabel = document.createElement('label');
        passwordLabel.setAttribute('for', 'password');
        passwordLabel.innerText = "Password:";
        let passwordInput = document.createElement('input');
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('id', 'password');
        passwordInput.setAttribute('name', 'password');
        passwordInput.required = true;

        // Create submit button
        let submitInput = document.createElement('input');
        submitInput.setAttribute('type', 'submit');
        submitInput.setAttribute('value', 'Login');

        // Append label and input fields to form
        form.appendChild(emailLabel);
        form.appendChild(document.createElement('br')); // Create a line break
        form.appendChild(emailInput);
        form.appendChild(document.createElement('br')); // Create a line break
        form.appendChild(passwordLabel);
        form.appendChild(document.createElement('br')); // Create a line break
        form.appendChild(passwordInput);
        form.appendChild(document.createElement('br')); // Create a line break
        form.appendChild(submitInput);

        // Create message div
        let messageDiv = document.createElement('div');
        messageDiv.setAttribute('id', 'message');

        // Append form and message div to form-container
        formContainer.appendChild(form);
        formContainer.appendChild(messageDiv);

        return formContainer.outerHTML;
    },

    afterRender: async () => {
        // Handle form submission
        document.getElementById('loginForm').addEventListener("submit", async (event) => {
            event.preventDefault(); // prevent the form from submitting normally

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await login(email, password);
            console.log(response);

            // Display a message depending on whether or not the login was successful
            const messageElement = document.getElementById("message");
            console.log(response);
            if (response.error === 'Validation error') {
                messageElement.textContent = 'Le mot de passe doit faire au moins 8 caractères.';
            }
            else if (response.error === 'Invalid credentials') {
                messageElement.textContent = 'Identifiants incorrects, veuillez réessayer.';
            }
            else {
                messageElement.textContent = 'Connexion réussie.';
                window.loggedIn = getCookie('loggedIn');
                // Redirect to home page
                window.location.href = '/';
            }
        });
    }
}
