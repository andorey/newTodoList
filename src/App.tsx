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
