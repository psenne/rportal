import React, { Suspense, lazy } from "react";
import { Route, Switch, Router } from "react-router-dom";
import history from "./modules/history";
import { Loader, Dimmer } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";

const LoginHistory = lazy(() => import("./AdminComponents/LoginHistory"));
const PositionsPage = lazy(() => import("./JobComponents/PositionsPage"));
const PositionDetailPage = lazy(() =>
  import("./JobComponents/PositionDetailPage")
);
const NoMatch = lazy(() => import("./nomatch"));

export default function AppRoutes() {
  return (
    <Router history={history}>
      <Suspense
        fallback={
          <Dimmer>
            <Loader>Loading...</Loader>
          </Dimmer>
        }>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <PositionsPage {...props} />}
          />
          <Route
            path="/:id"
            render={props => <PositionDetailPage {...props} />}
          />
          <Route
            path="/loginhistory"
            render={props => <LoginHistory {...props} />}
          />
          <Route render={() => <NoMatch />} />
        </Switch>
      </Suspense>
    </Router>
  );
}
