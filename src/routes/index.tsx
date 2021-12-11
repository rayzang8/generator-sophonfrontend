import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Home } from '../components';

export const RootRoutes = (): React.ReactElement => {
    useEffect(()=> {
        console.log('在应用代码中获取process.env.NODE_ENV值 =',process.env.NODE_ENV);
    }, []);   
    return (
        <BrowserRouter>
            <Routes>                              
                <Route path="/home" element={<Outlet />}>
                    <Route path="/" element={(<Home />)} />                    
                </Route>                
                <Route path="*" element={<Navigate to="/home" /> } />
            </Routes>
        </BrowserRouter>
    );
};
