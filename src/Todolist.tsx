import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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
    checkedItem: (value: string) => void
}


function ToDoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if ( e.key === 'Enter' && newTaskTitle.trim() ) {
            props.addTask( newTaskTitle.trim() )
            setNewTaskTitle('')
        }else{
            setError('Field is required')
        }
    }

    const onKeyPressButton = () => {
        if ( newTaskTitle.trim() === '' ) {
            setError('Field is required')
            return
        }
        props.addTask( newTaskTitle.trim() )
        setNewTaskTitle('')
    }

    const allSelectButton = () => props.filterTasks('all')
    const activeSelectButton = () => props.filterTasks('active')
    const completedSelectButton = () => props.filterTasks('completed')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeInput}
                       onKeyPress={onKeyPressInput}
                       className={ error ? 'error' : '' }
                />
                <button onClick={onKeyPressButton}> Add</button>
                { error && <div className='input-error'>{ error }</div> }
            </div>
            <ul>{
                props.tasks.map((el) => {
                    const removeTasksElement = () => props.removeTasks(el.id)
                    const checkedItems = () => props.checkedItem(el.id)

                    return (
                        <li key={el.id}>
                            <input type='checkbox' checked={el.isDone} onChange={checkedItems}/>
                            <span>{el.title}</span>
                            <button onClick={removeTasksElement}> X</button>
                        </li>)
                })
            }</ul>
            <div>
                <button className='active-filter' onClick={allSelectButton}>All</button>
                <button onClick={activeSelectButton}>Active</button>
                <button onClick={completedSelectButton}>Completed</button>
            </div>
        </div>
    )
}


export default ToDoList;