import React from 'react'
import Loader from './components/Loader';
import SnackBar from './components/SnackBar';
import AppRoutes from './AppRoutes';
import './styles/App.scss';

function App() {
    
    return (
        <div>
            <SnackBar />
            <Loader />
            <AppRoutes />
        </div>
    );
}

export default App;
