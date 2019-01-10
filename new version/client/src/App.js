import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav/Nav";
import Start from "./pages/Start";
import Create from "./pages/Create";
// import Profile from "./pages/Profile";
// import Share from "./pages/Share";


//Navigation imports ***PENDING PAGES CREATION***
// import Landing from "./pages/Landing";
// import Shopping from "./pages/Shopping";
// import Friends from "./pages/Friends";
// import Profile from "./pages/Profile";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>


        {/* <Route exact path="/Landing" component={Landing} /> */}
        <Route exact path="/" component={Start} />
        <Route exact path="/create" component={Create} />
        {/* <Route exact path="/profile" component={Profile} /> */}
        {/* //Navigation imports ***PENDING PAGES CREATION*** */}
        {/* <Route exact path="/Shopping" component={Shopping} />
        <Route exact path="/Friends" component={Friends} />
        <Route exact path="/Profile" component={Profile} /> */}

        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
