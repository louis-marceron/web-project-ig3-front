import { Router, handleInternalLinks } from './router.js'

import headerComponent from './components/header.js'

import notFoundView from "./views/notFound.js"
import mealsView from "./views/meals.js"
import loginView from "./views/login.js"
import registerView from "./views/register.js"
import accountSettingsView from "./views/accountSettings.js"
import statsView from "./views/stats.js"

const isLoggedIn = localStorage.getItem('isLoggedIn')

let routerOptions

if (isLoggedIn) {
    routerOptions = {
        notFound: notFoundView,
        routes: {
            '/': mealsView,
            '/repas': mealsView,
            '/statistiques': statsView,
            '/compte': accountSettingsView,
        },
    }
    // Render header
    document.querySelector('header').innerHTML = await headerComponent.render()
    await headerComponent.afterRender()
}

else {
    routerOptions = {
        notFound: loginView,
        routes: {
            '/': loginView,
            '/connexion': loginView,
            '/inscription': registerView,
        }
    }
}

const router = new Router(routerOptions)

handleInternalLinks(router)
