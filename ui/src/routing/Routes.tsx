import React from "react";

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
            <Route path={RoutePaths.LOGIN} component={Login} />
            <Route path={RoutePaths.REGISTER} component={Register} />
            <Route path={RoutePaths.ALBUMS + '/:id'} component={Album} />
            <Route path={RoutePaths.HOME} component={Home} />
        </Switch>
    );
}