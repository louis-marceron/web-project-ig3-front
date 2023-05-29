import Router from './router.js';
import homeView from './views/home.js';
import userManagementView from './views/userManagement.js';
import headerComponent from './components/header.js';

// Render header
document.querySelector('header').innerHTML = await headerComponent.render();

const routes = [
    { path: '/', template: homeView.render() },
    { path: '/src/index.html', template: userManagementView },
];

new Router(routes);
