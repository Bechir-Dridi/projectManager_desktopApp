import React from 'react'
import "../index.css"
//import icons:
import { BsTrash } from "react-icons/bs"
import { IconContext } from "react-icons"

export default function NPtasks({ taskName, setTaskName, taskDescription, setTaskDescription, handleTaskSave, tasks, handleDeleteTask }) {

  return (
    <div className='NPtasks-container'>
      {/* NPtasks.js */}
      <form onSubmit={handleTaskSave}>
        <div className="project-form">
          <p>
            <label htmlFor="projectName">enter task name</label>
            <input className='input'
              placeholder='name'
              maxLength={40}
              required
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
            />
          </p>

          <p>
            <label htmlFor="projectDescription">enter task description</label>
            <textarea
              className='input'
              placeholder='description'
              required
              value={taskDescription}
              onChange={e => setTaskDescription(e.target.value)}
            />
          </p>

          <div className='submitButton'>
            <button>save</button>
          </div>
        </div>
      </form>

      <div className='tasks-infos-container'>
        {tasks.map((element, taskId) => (
          <div className='main-task-infos' key={taskId} >
            <div className='task-infos'>
              {/* <h1>task {taskId + 1}</h1> */}
              <h1>task <span>{element.taskName}</span></h1>
            </div>
            <IconContext.Provider value={{ color: "white", size: "4rem", title: "icon" }}>
              <div className='button-container'><button onClick={() => handleDeleteTask(taskId)}><BsTrash /></button></div>
            </IconContext.Provider>
          </div>
        )
        )}
      </div>
    </div>
  )
}

