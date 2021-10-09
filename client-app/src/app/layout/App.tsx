import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
// import { isTaggedTemplateExpression } from 'typescript';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
// import { ducks } from './demo';
// import DuckItem from './DuckItem';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/forms/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

// below code has been recfactored as react states have been managed using modx.
// date - 19th Aug, 2021.
function App() {
  // react hook
  const location = useLocation();

  return (
    // Empty tag will denote <Fragment> isTaggedTemplateExpression.
    <>
      {/* exact keyword in Route tag will strictly check for the route path.
      This is needed as React will everything that matches route path. 
      date - 23rd Sept, 2021*/}
      <Route exact path='/' component={HomePage} />

      {/* Any route that match '/(.+)' is going to match this particular route. */}
      <Route
        path={'/(.+)'}
        render={
          () => (
            <>
              <NavBar />
              <Container style={{ marginTop: '7em' }}>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              </Container>
            </>
          )}
      />
    </>
  );
}

export default observer(App);
