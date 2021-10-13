import React, { useState, useEffect } from "react";
import {TaskRow} from "./components/TaskRow";
import {TaskBanner} from './components/TaskBanner'
import {TaskCreator} from './components/TaskCreator'
import {VisibilityControl} from './components/VisibilityControl'

function App() {
  // Definiendo el estado

  const [userName, setUserName] = useState("jumper");
  const [taskItems, settaskItems] = useState([
    { name: "task one", done: false },
    { name: "task two", done: true },
    { name: "task three", done: true },
    { name: "task four", done: false },
  ]);

  const [showCompleted, setshowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data != null) {
      settaskItems(JSON.parse(data))
    } else {
      setUserName('Jumper')
      settaskItems([
        { name: "Feed my Dog", done: false },
        { name: "Brush my hair", done: true },
        { name: "Clean my room", done: true },
        { name: "Take my pill", done: false },
      ])
      setshowCompleted(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  const createNewTask = taskName => {
    if(!taskItems.find(t => t.name === taskName)){
      settaskItems([...taskItems, {name: taskName, done: false}])
    }
  }

  const toggleTask = task =>
    settaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)))

  const taskTableRows = (doneValue) =>
    taskItems
    .filter(task => task.done === doneValue)
    .map(task => (<TaskRow task={task} key={task.name} toggleTask={toggleTask} />));

  return (
    <div className="App">
      <TaskBanner userName={userName} taskItems={taskItems} />

      <TaskCreator callback={createNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{taskTableRows(false)}</tbody>
      </table>

      <div className="bg-secondary text-center text-white p-2">
          <VisibilityControl 
              description="Completed Tasks"
              isChecked={showCompleted}
              callback={checked => setshowCompleted(checked)}
          />
      </div>    

        {
          showCompleted && (
            <table className="table table-striped table-bordered">
                <thead>
                  <th>Description</th>
                  <th>Done</th>
                </thead>
                <tbody>
                  {taskTableRows(true)}
                </tbody>
            </table>
          )
        }

      </div>
  );
}

export default App;
