import { Router, handleInternalLinks } from './router.js'

import headerComponent from './components/header.js'

import homeView from './views/home.js'
import userManagementView from './views/userManagement.js'
import notFoundView from "./views/notFound.js"

// Render header
document.querySelector('header').innerHTML = await headerComponent.render()

const router = new Router({
    notFound: notFoundView,
    routes: {
        '/src/index.html': homeView,
        '/src/users': userManagementView,
    },
})

handleInternalLinks(router)