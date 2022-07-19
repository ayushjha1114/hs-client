import React, { useEffect } from 'react'
import ReactGA from 'react-ga';
import Loader from './components/Loader';
import AppRoutes from './AppRoutes';
import config from './config/server';
function App() {

    const updateCache = (cacheVersion) => {
        window.localStorage.setItem("TCPL_CACHE_VERSION", config.cache_version);
        if (cacheVersion !== config.cache_version) {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
            console.log('Cache Cleared due to new deployment')
        }

    };
    useEffect(() => {
        const cacheVersion = window.localStorage.getItem("TCPL_CACHE_VERSION");
        updateCache(cacheVersion);
        if (config.app_environment === 'uat' || config.app_environment === 'prod') {
            ReactGA.initialize(config.google_analytics_id);
            ReactGA.pageview(window.location.pathname + window.location.search);
            ReactGA.event({
                category: 'Visits',
                action: 'Visited Portal'
            });
        }
    }, []);
    return (
        <div>
            <Loader />
            <AppRoutes />
        </div>
    );
}

export default App;
