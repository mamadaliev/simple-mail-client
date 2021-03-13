import React, {useState} from 'react'
import todo from './../../store/todo'
import count from './../../store/counter'
import {observer} from "mobx-react-lite"

const Todo = observer(() => {

    const [task, setTask] = useState({id: 0, text: '', completed: false});

    const addTask = () => {
        todo.add(task)
        count.count = todo.todos.length
    }

    return (
        <div>
            <div>
                {todo.todos.map(t =>
                    <div className="todo" key={t.id}>
                        <input type="checkbox" checked={t.completed} onChange={() => todo.complete(t.id)}/>
                        {t.id}. {t.text}
                        <button onClick={() => todo.remove(t.id)}>x</button>
                    </div>
                )}
            </div>
            <div>
                {console.log(task)}
            </div>
            <div>
                <div>
                    <input id="id" type="text" onChange={e => {
                        setTask(prevState => ({...prevState, id: e.target.value}));
                    }} value={task.id}/>
                </div>
                <div>
                    <input id="text" type="text" onChange={e => {
                        setTask(prevState => ({...prevState, text: e.target.value}));
                    }} value={task.text}/>
                </div>
                <div>
                    <button onClick={addTask}>Create</button>
                </div>
            </div>
        </div>
    );
});

export default Todo
