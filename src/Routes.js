import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Signup2 from './Pages/Signup/Signup2';
import Main from './Pages/Main/Main';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/Signup2" component={Signup2} />
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  );
}
export default Routes;
