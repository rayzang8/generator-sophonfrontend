<<<<<<< HEAD
import React, { Suspense }  from 'react';
import { AppRouter } from './routes';


export default (): React.ReactElement => {
    return (
        <Suspense fallback="loading">
            <AppRouter />
        </Suspense>
    );
=======
import React from 'react';
import { RootRoutes } from './routes';

export const App = (): React.ReactElement => {
    
    return <RootRoutes />;
>>>>>>> 12b3e236cfb94315a2ec28cee47ec104b5b99a50
};
