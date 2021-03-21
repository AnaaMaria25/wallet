import React from "react";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{ pathname: '/' }} />
    );
    return <Route {...rest} render={routeComponent} />;
};