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
