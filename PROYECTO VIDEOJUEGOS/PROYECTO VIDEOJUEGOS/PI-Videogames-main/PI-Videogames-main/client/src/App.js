import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Create from "./views/Create/Create";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route path="/home" render={() => <Home />} />
          <Route path="/detail/:id" render={() => <Detail />} />
          <Route path="/create" render={() => <Create />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
