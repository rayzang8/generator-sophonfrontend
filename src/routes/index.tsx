import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Home, NotFound } from '../pages';

export const RootRoutes = (): React.ReactElement => {
  
    return (
        <BrowserRouter>
            <Routes>                              
                <Route path="/home" element={<Outlet />}>
                    <Route path="/" element={(<Home />)} />                    
                </Route>                
                <Route path="/" element={<Navigate to="/home" /> } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
