// import './App.css';

import {Switch, Route, Link} from 'react-router-dom'
import Counter from "./components/examples/Counter";
import Todo from "./components/examples/Todo";
import Home from "./components/pages/Home";
import TodoPage from "./components/examples/TodoPage";
import Inbox from "./components/pages/Inbox";
import Sent from "./components/pages/Sent";
import Compose from "./components/pages/Compose";
import Settings from "./components/pages/Settings";

import "./styles/App.css"
import "./styles/Input.css"

function App() {
  return (
    <div>
        <div className="header">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/compose'>Compose</Link></li>
                <li><Link to='/inbox'>Inbox</Link></li>
                <li><Link to='/sent'>Sent</Link></li>
                <li><Link to='/settings'>Settings</Link></li>
            </ul>
        </div>

        {/*<div>*/}
        {/*    <span><Link to='/counter'>Counter</Link> </span>*/}
        {/*    <span><Link to='/todos'>Todos</Link></span>*/}
        {/*</div>*/}

        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/inbox' component={Inbox}/>
            <Route path='/sent' component={Sent}/>
            <Route path='/compose' component={Compose}/>
            <Route path='/settings' component={Settings}/>
            <Route path='/counter' component={Counter}/>
            <Route path={'/todos/:id'} component={TodoPage}/>
            <Route path='/todos' component={Todo}/>
        </Switch>
    </div>
  );
}

export default App;
