import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string
    filter: FilterValueType
    title: string
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, filter: "all", title: 'what need I do'},
        {id: todoListId_2, filter: "all", title: 'what need I buy'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Car', isDone: false},
            {id: v1(), title: 'Home', isDone: false},
            {id: v1(), title: 'Computer', isDone: false},
        ],
    })

    const removeTasks = (id: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(el => el.id !== id)
        setTasks({...tasks});
    }

    const addTask = (value: string, todoListId: string) => {
        const newTask = {id: v1(), title: value, isDone: false}
        setTasks({ ...tasks, [todoListId]:[newTask, ...tasks[todoListId]] });
    }
    // [ ...task ] ---> "spread operator" - destructuring

    const checkedItems = (id: string, newIsDoneValue: boolean, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].map(el => el.id === id ? {...el, isDone:newIsDoneValue} : el);
        setTasks({ ...tasks});
    }


    // place where describe which filter will be in ToDoList -----------------

    let tasksForToDoList = tasks;

    if (filter === 'active') {
        tasksForToDoList = tasks.filter(el => !el.isDone);
    }
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(el => el.isDone);
    }
    //-------------------------------------------------------------------------


    const filterTasks = (value: FilterValueType) => setFilter(value);
    // the function that defines the value for the filter -------------------

    return (
        <div className="App">
            <ToDoList title='What to learn'
                      tasks={tasksForToDoList}
                      removeTasks={removeTasks}
                      filterTasks={filterTasks}
                      addTask={addTask}
                      checkedItem={checkedItems}
                      filter={filter}
            />
        </div>
    );
}

export default App;
