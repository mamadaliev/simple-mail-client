const DATA_SERVICE = "https://jsonplaceholder.typicode.com";
const TODOS = "/todos";

class TaskService {

    get = async () => {
        const options = {
            method: "GET",
        }
        const request = new Request(DATA_SERVICE + TODOS, options);
        const response = await fetch(request);
        return response.json();
    }

    getById = async (id) => {
        const options = {
            method: "GET",
        }
        const request = new Request(DATA_SERVICE + TODOS + '/' + id, options);
        const response = await fetch(request);
        return response.json();
    }
}

export default TaskService
