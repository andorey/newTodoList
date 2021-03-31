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
            {id: v1(), title: 'JavaScript', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},
        ],
    })

    const checkedItems = (id: string) => {
        tasks.map(el => el.id === id ? el.isDone = !el.isDone : el.isDone);
        // [ ...task ] ---> "spread operator" - destructuring
        setTasks([...tasks]);
    }

    const removeTasks = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id));
    }

    const addTask = (value: string) => {
        //[newTask, ...tasks]
        setTasks([{id: v1(), title: value, isDone: false}, ...tasks]);
    }


    // place where describe which filter will be in ToDoList -----------------
    const [filter, setFilter] = useState<FilterValueType>('all')

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
