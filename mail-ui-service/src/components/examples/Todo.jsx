import React, {useState} from 'react'
import {observer} from "mobx-react-lite"
import todo from '../../store/examples/todo'
import count from '../../store/examples/counter'
import TaskStore from "../../store/examples/TaskStore";
import {Link} from "react-router-dom";

const Todo = observer(() => {

    const [task, setTask] = useState({id: 0, title: '', completed: false});

    useState(() => {
        TaskStore.getTasksAsync().catch(e => console.log(e))
    });

    const addTask = () => {
        todo.add(task)
        count.count = todo.todos.length
    }

    const getTodos = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                data.map(t => todo.add(t))
                // todo = [...this.todos, ...data]
            })
    }

    return (
        <div>
            <div>
                {todo.todos.map(t =>
                    <div className="todo" key={t.id}>
                        <input type="checkbox" checked={t.completed} onChange={() => todo.complete(t.id)}/>
                        {t.id}. {t.title}
                        <button onClick={() => todo.remove(t.id)}>x</button>
                    </div>
                )}
            </div>
            <div>
                <div>
                    <input id="id" type="text" onChange={e => {
                        setTask(prevState => ({...prevState, id: e.target.value}));
                    }} value={task.id}/>
                </div>
                <div>
                    <input id="title" type="text" onChange={e => {
                        setTask(prevState => ({...prevState, title: e.target.value}));
                    }} value={task.title}/>
                </div>
                <div>
                    <button onClick={addTask}>Create</button>
                </div>
                <div>
                    <button onClick={getTodos}>Load</button>
                </div>
            </div>
            <div>
                {TaskStore.taskList.map(task => (
                    <div key={task.id}>
                        <Link to={{ pathname: `/todos/${task.id}` }}>{task.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Todo
