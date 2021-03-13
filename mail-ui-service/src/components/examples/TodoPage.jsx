import React, {useState} from 'react'
import {observer} from "mobx-react-lite"
import TaskStore from "../../store/examples/TaskStore";
import {useParams} from "react-router";

const TodoPage = observer(() => {

    let params = useParams();

    useState((e) => {
        console.log(params.id);
        TaskStore.getTaskByIdAsync(params.id).catch(e => console.log(e))
    });

    return (
        <div>
            {TaskStore.currentTask.id}<br/>
            {TaskStore.currentTask.title}<br/>
            {TaskStore.currentTask.completed}<br/>
        </div>
    );
});

export default TodoPage
