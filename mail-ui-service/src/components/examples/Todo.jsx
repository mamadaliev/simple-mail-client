import React, {useState} from 'react'
import {observer} from "mobx-react-lite"
import todo from '../../store/examples/todo'
import count from '../../store/examples/counter'
import TaskStore from "../../store/examples/TaskStore";
import {Link} from "react-router-dom";

const Todo = observer(() => {

    const [task, setTask] = useState({id: 0, title: '', completed: false});

    useState(() => {
        TaskStore.getTasksAsync().then(() => TaskStore.setLoaded(true))
    });

    const addTask = () => {
        todo.add(task)
        count.count = todo.todos.length
    }

    const getTodos = () => {
        todo.isLoading = true
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                data.map(t => todo.add(t))
                // todo = [...this.todos, ...data]
                todo.isLoading = false
            })
    }

    let todoList =
        <div>
            {TaskStore.taskList.map(task => (
                <div key={task.id}>
                    <Link to={{pathname: `/todos/${task.id}`}}>{task.title}</Link>
                </div>
            ))}
        </div>

    let myTodoList =
        <div>
            {todo.todos.map(t =>
                <div className="todo" key={t.id}>
                    <input type="checkbox" checked={t.completed} onChange={() => todo.complete(t.id)}/>
                    {t.id}. {t.title}
                    <button onClick={() => todo.remove(t.id)}>x</button>
                </div>
            )}
        </div>

    return (
        <div>
            { todo.isLoading ? <div>Loading...</div> : myTodoList }
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

            {TaskStore.isLoaded ? todoList : <div>Loading...</div>}

        </div>
    );
});

export default Todo
