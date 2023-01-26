import React, { useState } from 'react'
import "../index.css"
//import icons:
import { BsTrash } from "react-icons/bs"
import { IconContext } from "react-icons"

export default function NPsubTasks({ subTaskName, setSubTaskName, subTaskDescription, setSubTaskDescription, handleAddSubTasks, handleSubTaskSave, tasks, handleDeleteTask, handleDeleteSubTask, subTasks, goFilterFct, filtered }) {


  return (
    <div className='NPsubTasks-container'>
      {/* NPsubTasks.js */}
      <div className='tasks'>
        {tasks.map((element, j) => (
          <div key={j} >
            <button onClick={() => goFilterFct(j)}>
              {/* <h1>task {element.taskId}</h1> */}

              <h1>task <span>{element.taskName}</span></h1>
              <IconContext.Provider value={{ color: "white", size: "2rem", title: "icon" }}>
                <div className='button-container'><button onClick={() => handleDeleteTask(element.taskId)}><BsTrash /></button></div>
              </IconContext.Provider>

            </button>
          </div>
        )
        )}
      </div>

      <div className='sub-tasks-form'>
        {filtered.map((element, h) => (
          <div key={h} >
            <div className='task-name-container'>
              <h1>task {element.taskName}</h1>
            </div>

            <form onSubmit={handleSubTaskSave}>
              <div className="project-form">
                <p>
                  <label htmlFor="projectName">enter sub-task name</label>
                  <input className='input'
                    placeholder='name'
                    maxLength={40}
                    required
                    value={subTaskName}
                    onChange={e => setSubTaskName(e.target.value)}
                  />
                </p>

                <p>
                  <label htmlFor="projectDescription">enter sub-task description</label>
                  <textarea
                    className='input'
                    placeholder='description'
                    required
                    value={subTaskDescription}
                    onChange={e => setSubTaskDescription(e.target.value)}
                  />
                </p>

                <div className='submitButton'>
                  <button>save</button>
                </div>
              </div>
            </form>

            <div className='sub-tasks-infos-container'>
              {subTasks.map((element, subTaskId) => (
                <div className='main-sub-task-infos' key={subTaskId} >
                  <div className='task-infos'>
                    {/* <h1>task {element.subTaskId}</h1> */}
                    <h1>task <span>{element.subTaskName}</span></h1>
                  </div>
                  <IconContext.Provider value={{ color: "white", size: "2rem", title: "icon" }}>
                    <div className='button-container'><button onClick={() => handleDeleteSubTask(subTaskId)}><BsTrash /></button></div>
                  </IconContext.Provider>
                </div>
              )
              )}
            </div>
            <div className='add-sub-tasks-container'>
              <button onClick={() => handleAddSubTasks(element.taskId)}>add sub-tasks</button>
            </div>
          </div>
        ))

        }

      </div>
    </div>
  )
}
