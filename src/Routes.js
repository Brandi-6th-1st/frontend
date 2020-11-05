import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Main from './Pages/Main/Main';
import ProductManagement from './Pages/Product/ProductManagement';
import ProductDetailManage from './Pages/ProductDetailManage/ProductDetailManage';
import Home from './Pages/Home/Home';
import Order from './Pages/Order/Order';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/product" component={ProductManagement} />
        <Route exact path="/product_detail" component={ProductDetailManage} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/order/:id" component={Order} />
      </Switch>
    </Router>
  );
}
export default Routes;
