import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Signup from './components/Signup';
import Login from './components/Login'
import Home from './components/Home';

import './App.css';

const App = () =>(
  <BrowserRouter>
    <Switch>
      <Route path="/signup" exact component={Signup} />
      <Route path='/login' exact component={Login} />
      <Route path="/home" exact component={Home}/>
    </Switch>
  </BrowserRouter>
)

export default App;
