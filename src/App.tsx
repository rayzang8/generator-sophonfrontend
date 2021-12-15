import React, { Suspense }  from 'react';
import { RootRoutes } from './routes';
import '#locales';

export const App = (): React.ReactElement => {
    
    return (
        <Suspense fallback="loading">
            <RootRoutes />
        </Suspense>
    );
};
