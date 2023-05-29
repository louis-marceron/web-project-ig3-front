import notFound from "./views/notFound.js";

class Router {
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }

    async loadRoute(...urlSegs) {
        const matchedRoute = this._matchUrlToRoute(urlSegs);

        if (!matchedRoute) {
            const main = document.querySelector('main');
            console.log('No matched route');
            main.innerHTML = await notFound.render();
            return;
        }

        console.log(`matchedRoute: ${matchedRoute}`);
        const url = `/${urlSegs.join('/')}`;
        console.log(`url: ${url}`);
        history.pushState({}, 'this works', url);
        const main = document.querySelector('main');
        main.innerHTML = await matchedRoute.template.render();
    }

    _matchUrlToRoute(urlSegs) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegs = route.path.split('/').slice(1);
            if (routePathSegs.length !== urlSegs.length) {
                return false;
            }
            return routePathSegs.every((routePathSeg, i) => routePathSeg === urlSegs[i]);
        });
        return matchedRoute;
    }

    _loadInitialRoute() {
        // Split the path name from the URL into an array of segments
        const pathnameSplit = window.location.pathname.split('/');
        const pathSegs = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : [''];
        this.loadRoute(...pathSegs);
    }
}

export default Router;
