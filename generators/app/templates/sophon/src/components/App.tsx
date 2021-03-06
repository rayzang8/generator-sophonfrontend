import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
// import { HomeRoute } from './routes/home';
import { HomeRoute } from '#routes/home';

export const App = (): React.ReactElement => {
    useEffect(()=> {
        console.log('在app中获取process.env.NODE_ENV值333 =',process.env.NODE_ENV);
    }, []);   
    return (
        <BrowserRouter>
            <Routes>                              
                <Route path="/home" element={<Outlet />}>
                    <Route path="/" element={(<HomeRoute />)} />                    
                </Route>                
                <Route path="*" element={<Navigate to="/home" /> } />
            </Routes>
        </BrowserRouter>
    );
};
