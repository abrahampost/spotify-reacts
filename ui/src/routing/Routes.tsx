import React from "react";

import { Redirect } from 'react-router-dom';

import { Route, Switch } from 'react-router-dom';
import { Album } from "../views/Album";
import { Home } from "../views/Home";
import { Login } from "../views/Login";
import { Register } from "../views/Register";

export enum RoutePaths {
    HOME = '/',
    REGISTER = '/register',
    LOGIN = '/login',
    ALBUMS = '/albums'
}

export const Routes = () => {
    return (
        <Switch>
            <Route exact path={RoutePaths.LOGIN} component={Login} />
            <Route exact path={RoutePaths.REGISTER} component={Register} />
            <Route exact path={RoutePaths.ALBUMS + '/:id'} component={Album} />
            <Route exact path={RoutePaths.HOME} component={Home} />
            <Route path="*" component={() => <Redirect to={RoutePaths.HOME} />} />
        </Switch>
    );
}