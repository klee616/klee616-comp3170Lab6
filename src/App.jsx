import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import ButtonPrimary from './components/ButtonPrimary'
import { initialTasks } from './fixtures'

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [initialTaskData, setInitialTaskData] = useState({
    id: nanoid(),
    task: '',
    isFinish: false,
  })

  const [taskData, setTaskData] = useState(initialTaskData);

  function handleSubmit(e) {
    e.preventDefault();
    setTasks([...tasks, taskData]);
    console.log(tasks);
    setTaskData({
      id: nanoid(),
      task: '',
      isFinish: false,
    });
  }

  function onChangeTask(e) {
    setTaskData({ ...taskData, task: e.target.value })
  }

  function removeTask(id) {
    setTasks(oldValue => {
      return oldValue.filter(task => task.id !== id)
    })
  }


  const taskListUI = tasks.map((task, index) =>  (
      <div key={`ID-${index}-${task.id}`} className='task-box' data-id={task.id} >
        <input type="checkbox" name={`task-${task.id}`} id={`task-${task.id}`} checked={task.isFinish} onChange={handleTaskChange} />
        <label htmlFor={`task-${task.id}`}>{task.task}</label>
        <button onClick={() => removeTask(task.id)}>Delete</button>
      </div>
    ))

  function handleTaskChange(e) {
    const parentObj = e.target.parentElement;
    const taskId = parentObj.dataset.id;
    console.log(taskId);
    console.log(e.target.checked)
    const update = tasks.map(taskData =>
      taskData.id == taskId ? { ...taskData, isFinish: e.target.checked } : taskData
    );
    console.log(update)
    setTasks(update);
  }

  return (
    <>
      <div>
        <h1>Daily Planner</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input className='task-input' type="text" name="task" value={taskData.task} onChange={onChangeTask} />
          <ButtonPrimary name="Save" />
        </form>
      </div>
      <div>
        <h2>You have {tasks.filter((taskData) => taskData.isFinish == false).length} tasks remaining</h2>
        <div className='task-list'>
          {taskListUI}
        </div>
      </div>
    </>
  )

}

export default App
