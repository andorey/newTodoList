import React, {useState} from "react";
import {FilterValueType} from "./App";


type TasksType = {
    title: string
    id: string
    isDone: boolean
}

type PropsType = {
    title: string;
    tasks: Array<TasksType>
    removeTasks: (taskId: string) => void
    filterTasks: (value: FilterValueType) => void
    addTask: (value: string) => void
}

function ToDoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={ (el) => setNewTaskTitle(el.currentTarget.value) }/>
                <button onClick={ () => {
                    if (newTaskTitle.trim()){
                        props.addTask(newTaskTitle)
                        setNewTaskTitle('')
                    }

                } }> Add </button>
            </div>
            <ul>{
                props.tasks.map(el => <li key={el.id}>
                    <input type='checkbox' checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={ () => props.removeTasks(el.id) }> X </button>
                </li>)
            }</ul>
            <div>
                <button onClick={ () => props.filterTasks('all') }>All</button>
                <button onClick={ () => props.filterTasks('active') }>Active</button>
                <button onClick={ () => props.filterTasks('completed') }>Completed</button>
            </div>
        </div>
    )
}


export default ToDoList;