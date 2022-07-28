import React, { useEffect } from 'react'
import Loader from './components/Loader';
import AppRoutes from './AppRoutes';
import config from './config/server';
import './styles/App.scss';
function App() {

    const updateCache = (cacheVersion) => {
        window.localStorage.setItem("xx", config.cache_version);
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
        const cacheVersion = window.localStorage.getItem("xx");
        updateCache(cacheVersion);
    }, []);
    return (
        <div>
            <Loader />
            <AppRoutes />
        </div>
    );
}

export default App;
