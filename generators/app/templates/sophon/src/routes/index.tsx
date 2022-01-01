<<<<<<< HEAD
import React, { lazy }  from 'react';
import { BrowserRouter } from 'react-router-dom';
import RootRoutes from './RootRoutes';

export const AppRouter = (): React.ReactElement => {
    return (
        <BrowserRouter>
            <RootRoutes />
        </BrowserRouter>
    );
};

const inject2PortalRoutes = [
    {
        module: process.env.federationName,
        path: `/${process.env.federationName!}`,
        component: lazy(() => import('./RootRoutes')),
        children: []
    }
];

export default inject2PortalRoutes;
=======
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
>>>>>>> 12b3e236cfb94315a2ec28cee47ec104b5b99a50
