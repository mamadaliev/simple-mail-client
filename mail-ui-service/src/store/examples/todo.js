import {makeAutoObservable} from "mobx";

class Todo {

    todos = [
        // {id: "1", title: "Wake up at 9 o'clock", completed: false}
    ]

    constructor() {
        makeAutoObservable(this)
    }

    add(todo) {
        this.todos.push(todo)
    }

    remove(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    complete(id) {
        this.todos.map(todo => {
            if (todo.id === id) todo.completed = !todo.completed;
            return todo
        })
    }

}

export default new Todo()
