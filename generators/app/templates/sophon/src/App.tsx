import React, { Suspense }  from 'react';
import { AppRouter } from './routes';


export default (): React.ReactElement => {
    return (
        <Suspense fallback="loading">
            <AppRouter />
        </Suspense>
    );
};
