import React, {useState} from 'react';
import './App.css';
import ToDoList from './Todolist';

export type FilterValueType = 'all' | 'completed' | 'active';

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JavaScript', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Rest API', isDone: true},
        {id: 5, title: 'GraphQL', isDone: false},
    ])

    const removeTasks = (id: number) => {
        const removedTasks = tasks.filter( el => el.id !== id );
        setTasks(removedTasks);
    }

    // const addedTask = (value: string) => {
    //     const add = {id: tasks[tasks.length-1].id + 1, title: value, isDone: false }
    //     tasks.push(add)
    //     setTasks(tasks);
    // }


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
                      //addedTasks={addedTask}
            />
        </div>
    );
}

export default App;
