import React from "react";

import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import Home from "../pages/Home/index";
import User from "../pages/User/index";

const getRouter = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/user">Page1</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/user" component={User} />
      </Switch>
    </div>
  </Router>
);
export default getRouter;
