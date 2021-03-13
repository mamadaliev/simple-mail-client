import TaskService from "../../services/examples/TaskService";
import {makeAutoObservable} from "mobx";

const {runInAction} = require("mobx");

class TaskStore {

    taskList = []
    currentTask = {
        id: 0,
        title: '',
        completed: false
    }

    constructor() {
        makeAutoObservable(this)
        this.taskService = new TaskService()
    }

    getTasksAsync = async () => {
        try {
            const data = await this.taskService.get()
            runInAction(() => {
                this.taskList = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    getTaskByIdAsync = async (id) => {
        try {
            const data = await this.taskService.getById(id)
            runInAction(() => {
                this.currentTask = data;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    }
}

export default new TaskStore()
