import React, { useState } from 'react'
import '../index.css'
//import NP components:
import NPproject from './NPproject'
import NPtasks from './NPtasks'
import NPsubTasks from './NPsubTasks'
//after submission:
import { useNavigate } from 'react-router-dom'
//idb:
import { addProject } from '../data/idb'

export default function NP() {
    //after submission:
    //const history = useNavigate()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    //NPproject.js

    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")

    const [savedProjectName, setSavedProjectName] = useState("")
    const [savedProjectDescription, setSavedProjectDescription] = useState("")

    const handleProjectSave = (e) => {
        e.preventDefault()
        setSavedProjectName(projectName); setSavedProjectDescription(projectDescription);
        setProjectName(""); setProjectDescription("");
    }


    //NPtasks.js
    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [subTasks, setSubTasks] = useState([])
    let [taskId, setTaskId] = useState(0)

    const [showSubTasksStatus, setShowSubTasksStatus] = useState(true)

    const task = { taskName, taskDescription, subTasks, showSubTasksStatus, taskId }
    const [tasks, setTasks] = useState([])

    const handleTaskSave = (e) => {
        e.preventDefault()

        const newTasks = [...tasks, task]
        setTasks(newTasks)
        setTaskId(taskId += 1)
        setTaskName(""); setTaskDescription("");
    }

    //delete a task:
    const handleDeleteTask = (k) => {
        //delete the task:
        const newTasks = [...tasks];
        //newTasks.splice(i, 1);
        setTasks(newTasks.filter((element, i) => i !== k))

        //reset the task Id:
        setTaskId(newTasks.length - 1)
        for (let m = k + 1; m <= newTasks.length; m++) {
            newTasks[m].taskId -= 1
        }

        setTasks(newTasks);
    }

    //NPsubTasks.js 
    const [subTaskName, setSubTaskName] = useState("")
    const [subTaskDescription, setSubTaskDescription] = useState("")

    let [subTaskId, setSubTaskId] = useState(1)

    const subTask = { subTaskName, subTaskDescription, subTaskId }

    const handleSubTaskSave = (e) => {
        e.preventDefault()

        const newSubTasks = [...subTasks, subTask]
        setSubTasks(newSubTasks)

        setSubTaskId(subTaskId += 1)

        setSubTaskName(""); setSubTaskDescription("");
    }

    //add sub-tasks:
    const handleAddSubTasks = (i) => {
        const newTasks = [...tasks];
        newTasks[i].subTasks = subTasks
        setTasks(newTasks);
        setSubTasks([])
        setSubTaskId(1)
    }

    //filtering tasks to add subTasks:
    const [filtered, goFilter] = useState([]);
    const goFilterFct = (k) => {
        goFilter(tasks.filter((element, i) => i === k))
    }

    //delete a subTask:
    const handleDeleteSubTask = (i) => {
        //delete the subTask:
        const newSubTasks = [...subTasks];
        newSubTasks.splice(i, 1);

        setSubTasks(newSubTasks);
    }

    //submit to DB:
    const handleSubmit = (e) => {
        e.preventDefault()

        setTasks([])
        setSubTasks([])
        const project = { savedProjectName, savedProjectDescription, tasks }

        setIsLoading(true);

        //add project:
        addProject(project)

        console.log("project basic infos added")
        setIsLoading(false)

        navigate("/Submission")
    }


    //show project by part:
    let [counter, setCounter] = useState(0)
    const NPcomponents = ["a", "b", "c"]
    const NPLen = NPcomponents.length;

    const next = () => {
        setCounter(counter += 1)
        console.log(NPcomponents[counter]);
        console.log("counter:", counter)
        console.log("length:", NPLen)
    }
    const back = () => {
        setCounter(counter -= 1)
        console.log(NPcomponents[counter]);
        console.log("counter:", counter)
        console.log("length:", NPLen)
    }

    return (
        <div className='NP'>
            <div className="nextBack">
                <div className="back">
                    {(counter !== 0) && <button onClick={back}>back</button>}
                </div>
                <div className="next">
                    {(counter < NPLen - 1) && <button onClick={next}>next</button>}
                </div>
            </div>

            {(counter === 0) && <NPproject projectName={projectName} setProjectName={setProjectName} projectDescription={projectDescription} setProjectDescription={setProjectDescription} savedProjectName={savedProjectName} savedProjectDescription={savedProjectDescription} handleProjectSave={handleProjectSave} />}
            {(counter === 1) && <NPtasks taskName={taskName} setTaskName={setTaskName} taskDescription={taskDescription} setTaskDescription={setTaskDescription} handleTaskSave={handleTaskSave} tasks={tasks} handleDeleteTask={handleDeleteTask} />}
            {(counter === 2) && <NPsubTasks subTaskName={subTaskName} setSubTaskName={setSubTaskName} subTaskDescription={subTaskDescription} setSubTaskDescription={setSubTaskDescription} handleAddSubTasks={handleAddSubTasks} handleSubTaskSave={handleSubTaskSave} filtered={filtered} tasks={tasks} handleDeleteTask={handleDeleteTask} handleDeleteSubTask={handleDeleteSubTask} goFilterFct={goFilterFct} subTasks={subTasks} subTaskId={subTaskId} />}

            {/* 
            <div className='submitButton'>
                {(counter === 2) && <div>
                    {!isLoading && <button onClick={handleSubmit}>submit</button>}
                    {isLoading && <button disabled>submitting...</button>}
                </div>}
            </div> */}
            <div className='submitButton'>
                {!isLoading && <button onClick={handleSubmit}>submit</button>}
                {isLoading && <button disabled>submitting...</button>}
            </div>
        </div >

    )
}
