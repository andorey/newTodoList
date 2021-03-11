import React from "react";
import {FilterValueType} from "./App";


type TasksType = {
    title: string
    id: number
    isDone: boolean
}

type PropsType = {
    title: string;
    tasks: Array<TasksType>
    removeTasks: (taskId: number) => void
    filterTasks: (value: FilterValueType) => void
}

function ToDoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button> Add </button>
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