import React,{useState} from 'react'

export const TaskCreator = props => {

    const [newTaskName, setNewTaskName] = useState('');

    const updateNewTaskValue = e => setNewTaskName(e.target.value)

    const createNewTask = () => {
        props.callback(newTaskName)
        setNewTaskName('')
    }

    return(
        <div className="my-1">
            <div className="input-group input-group-sm px-3">        
            <input 
                placeholder="Write your task" 
                type="text" 
                className="form-control"
                value={newTaskName}
                onChange={updateNewTaskValue}
            />    
            </div>    
            <button className="btn btn-primary m-3" onClick={createNewTask}>
                Add
                <img 
                    className="mx-2"
                    src="/add.png" 
                    alt="icon" 
                    width="24" 
                    height="24" 
                />    
            </button>    
        </div>
    )
}