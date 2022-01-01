import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFound, Dashboard } from '../pages';

export const baseUrl = process.env.federationName?.toLocaleLowerCase() !== 'sophon' ? `/${process.env.federationName!}` : '';

export default (): React.ReactElement => {

    return <Switch>
        <Route path={`${baseUrl}/home`} component={Home} />
        <Route path={`${baseUrl}/dashboard`} component={Dashboard} />
        <Redirect path={`${baseUrl}/`} to={`${baseUrl}/home`} exact />
        <Route path={`${baseUrl}/*`} component={NotFound} />
    </Switch>;
};
