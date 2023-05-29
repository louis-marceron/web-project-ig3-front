class Router {
    constructor(routes) {
        this.notFound = routes.notFound
        this.routes = routes.routes
        this.loadRoute(window.location.pathname)
    }

    async loadRoute(pathName) {
        const main = document.querySelector('main')
        const view = this.routes[pathName]
        // history.pushState({}, '', pathName)
        main.innerHTML = await view.render()
    }
}

/**
 * This function change the behavior of links with class `.internal-link`
 * to use a router.
 * @param {Router} router
 * @returns {void}
 */
const handleInternalLinks = (router) => {
    const body = document.querySelector('body')

    body.addEventListener('click', function (event) {
        if (event.target.classList.contains('internal-link')) {
            // Prevent default link click behavior
            event.preventDefault()
            // Change the URL to the href attribute of our link
            window.history.pushState({}, "", event.target.href)
            console.log('Internal link clicked')
            // Load the page using the new URL
            router.loadRoute(event.target.pathname)
        }
    })

    window.onpopstate = handleLocation;

    function handleLocation() {
        const path = window.location.pathname
        router.loadRoute(path)
    }
}

export { Router, handleInternalLinks }
