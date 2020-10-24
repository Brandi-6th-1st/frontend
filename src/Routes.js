import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Main from './Pages/Main/Main';
import Home from './Pages/Home/Home';
import Order from './Pages/Order/Order';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/" component={Main} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Order" component={Order} />
        <Route exact path="/Order/:id" component={Order} />
      </Switch>
    </Router>
  );
}
export default Routes;
