import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type PropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTasks: (taskId: string) => void
    filterTasks: (value: FilterValueType) => void
    addTask: (value: string) => void
    checkedItem: (value: string) => void
    filter: string
}


function ToDoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTaskTitle.trim()) {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }

    const onKeyPressButton = () => {
        if (newTaskTitle.trim() === '') {
            setError('Field is required')
            return
        }
        props.addTask(newTaskTitle.trim())
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
                       className={error ? 'error' : ''}
                />
                <button className='inputButton' onClick={onKeyPressButton}>Add</button>
                {error && <div className='input-error'>{error}</div>}
            </div>
            <ul>{
                props.tasks.map((el) => {
                    const removeTasksElement = () => props.removeTasks(el.id)
                    const checkedItems = () => props.checkedItem(el.id)

                    return (
                        <li key={el.id} className={ el.isDone ? 'is-done' : '' }>
                            <input type='checkbox' checked={ el.isDone } onChange={checkedItems}/>
                            <span>{ el.title }</span>
                            <button onClick={removeTasksElement}> X</button>
                        </li>)
                })
            }</ul>
            <div className='buttons'>
                <button className={ props.filter === 'all' ? 'active-filter' : '' }
                        onClick={allSelectButton}>All</button>
                <button className={ props.filter === 'active' ? 'active-filter' : '' }
                        onClick={activeSelectButton}>Active</button>
                <button className={ props.filter === 'completed' ? 'active-filter' : '' }
                        onClick={completedSelectButton}>Completed</button>
            </div>
        </div>
    )
}


export default ToDoList;