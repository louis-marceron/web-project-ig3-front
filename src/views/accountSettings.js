import { deleteAccount, logout } from '../services/apiService.js'
import deleteLocalStorage from '../utils/deleteLocalStorage.js';

export default {
    render: async () => {
        return `
            <section id="account-settings">
                <h1>Paramètres du compte</h1>
                <button id="logout">Se déconnecter</button>
                <button id="delete-account">Supprimer le compte</button>
            </section>
        `
    },

    afterRender: async () => {
        // Delete account button click handler
        document.getElementById('delete-account').addEventListener('click', async () => {
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer votre compte? Cette action ne peut pas être annulée.");
            if (confirmation) {
                const response = await deleteAccount(localStorage.getItem('userId'));

                if (response.status !== 204) {
                    alert("Une erreur s'est produite lors de la suppression du compte");
                } else {
                    deleteLocalStorage();
                    window.location.href = '/';
                }
            }
        });

        // Logout button click handler
        document.getElementById('logout').addEventListener('click', async () => {
            const response = await logout();
            if (response.error) {
                alert("Une erreur s'est produite lors de la déconnexion");
            } else {
                deleteLocalStorage();
                window.location.href = '/';
            }
        });
    }
}
