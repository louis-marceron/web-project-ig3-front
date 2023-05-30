import { Router, handleInternalLinks } from './router.js'
import getCookie from './utils/getCookie.js'

import headerComponent from './components/header.js'

import homeView from './views/home.js'
import userManagementView from './views/userManagement.js'
import notFoundView from "./views/notFound.js"
import mealsView from "./views/meals.js"
import loginView from "./views/login.js"

const isLoggedIn = getCookie('loggedIn')

let routerOptions

if (isLoggedIn) {
    console.log('Logged in')
    routerOptions = {
        notFound: notFoundView,
        routes: {
            '/': homeView,
            '/repas': mealsView,
            '/statistiques': loginView,
            '/compte': userManagementView,
        },
    }
    // Render header
    document.querySelector('header').innerHTML = await headerComponent.render()
}

else {
    console.log('Not logged in')
    routerOptions = {
        notFound: loginView,
        routes: {
            '/': loginView,
        }
    }
}

const router = new Router(routerOptions)

handleInternalLinks(router)
