export default () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    // Redirect to home page
    window.location.href = '/'
}