import { React, useState, useEffect } from 'react'
import '../index.css'
import { BsTrash } from "react-icons/bs"
import { IconContext } from "react-icons"
import { useNavigate, useParams } from 'react-router-dom'
//import idb:
import { db } from '../data/idb';


export default function ProjectDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [project, getProject] = useState([])
    const [tasks, getTasks] = useState([])
    const [error, set_error] = useState(null)

    const { id } = useParams()
    const a = parseInt(id, 10)
    console.log(a)

    useEffect(() => {
        const oneProject = db.projects.get(a)
        console.log("oneProject", oneProject)
        oneProject
            .then((value) => {
                getProject(value)
                getTasks(value.tasks)
                console.log("oneProjectValue", value)
                setIsLoading(false)
            })
            .catch(err => {
                set_error(err.message)
                setIsLoading(false)
            })

    }, [a])


    //delete a project:
    const navigate = useNavigate()
    const handleDeleteProject = (projectId) => {
        db.projects.delete(projectId)
            .then(console.log(`project ${projectId} deleted`), navigate('/'))
            .catch(err => console.log('deleting project error:', err.message))
    }


    //show subTasks 
    const showSubTasks = (i) => {
        const newTasks = [...tasks]
        newTasks[i].showSubTasksStatus = !newTasks[i].showSubTasksStatus;
        getTasks(newTasks);
        console.log("showSubtasks activated for:", `task ${i}`);
    }

    return (
        <div>
            {error && <span>{error}</span>}
            {isLoading && <span>Loading...</span>}
            {project && (
                <div>
                    <section className='basic-project-infos'>
                        <div className='project-title'>
                            <h1>{project.projectName}</h1>
                            <IconContext.Provider value={{ color: "white", size: "2rem", title: "icon" }}>
                                <button onClick={() => handleDeleteProject(project.id)}><BsTrash /></button>
                            </IconContext.Provider>
                        </div>
                        <p>{project.projectDescription}</p>
                    </section>
                    <section className='tasks-infos'>
                        {tasks.map((task, i) => (
                            <ul key={i}>
                                <div className='task-title'>
                                    <li>task {i + 1}</li>
                                    <li>{task.taskName}</li>
                                </div>
                                <li>{task.taskDescription}</li>
                                {/* <li>{task.showSubTasksStatus}</li> */}

                                <div className='subTasks-container'>
                                    {task.subTasks.length !== 0 && <div>
                                        <button onClick={() => showSubTasks(i)}>
                                            <span> show sub-tasks </span>
                                            <span>
                                                {task.showSubTasksStatus ? (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" id="arrow">
                                                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                                    </svg>) : (
                                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
                                                    </svg>
                                                )}
                                            </span>
                                        </button>
                                        <div style={{ display: task.showSubTasksStatus ? "none" : "" }}>

                                            {task.subTasks.map((item) =>
                                                <ul key={item.subTaskId}>
                                                    <div className='subTask-title'>
                                                        <li>sub-task {item.subTaskId}</li>
                                                        <li>{item.subTaskName}</li>
                                                    </div>
                                                    <li>{item.subTaskDescription}</li>
                                                </ul>
                                            )}

                                        </div>
                                    </div>}
                                </div>
                            </ul>
                        ))}
                    </section>
                </div>
            )
            }
        </div >
    )
}
