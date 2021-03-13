// import './App.css';

import {Switch, Route, Link} from 'react-router-dom'
import Counter from "./components/examples/Counter";
import Todo from "./components/examples/Todo";
import Home from "./components/pages/Home";
import TodoPage from "./components/examples/TodoPage";

function App() {
  return (
    <div>
        <div>
            <span><Link to='/'>Home</Link> </span>
            <span><Link to='/counter'>Counter</Link> </span>
            <span><Link to='/todos'>Todos</Link></span>
        </div>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/counter' component={Counter}/>
            <Route path={'/todos/:id'} component={TodoPage}/>
            <Route path='/todos' component={Todo}/>
        </Switch>
        <div>
            ...
        </div>
    </div>
  );
}

export default App;
