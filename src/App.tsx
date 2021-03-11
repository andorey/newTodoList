import React, {useState} from 'react';
import './App.css';
import ToDoList from './Todolist';
import {v1} from "uuid";

export type FilterValueType = 'all' | 'completed' | 'active';

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])

    const removeTasks = (id: string) => {
        const removedTasks = tasks.filter( el => el.id !== id );
        setTasks(removedTasks);
    }

    const addTask = (value: string) => {
        const newTask = {id: v1(), title: value, isDone: false };
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }


    // place where describe which filter will be in ToDoList -----------------
    const [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForToDoList = tasks;

    if(filter === 'active'){
        tasksForToDoList = tasks.filter(el => !el.isDone);
    }
    if(filter === 'completed'){
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
            />
        </div>
    );
}

export default App;
