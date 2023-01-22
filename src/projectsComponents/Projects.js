import { React, useState, useEffect } from 'react'
import ProjectsOutput from './ProjectsOutput';
import { Link } from 'react-router-dom'
//import idb:
import { db } from '../data/idb';
//import LiveQuery:
import { useLiveQuery } from "dexie-react-hooks";



export default function Projects() {
    const [is_loading, set_is_loading] = useState(true)
    const [dbData, getDbData] = useState([])
    const [projectsLen, getProjectsLen] = useState()
    const [error, set_error] = useState(null)

    const allProjects = useLiveQuery(() => db.projects.toArray(), []);
    console.log("my All idb Projects", allProjects)


    useEffect(() => {
        //get all projects from idb:
        getDbData(allProjects)
        if (allProjects) {
            getProjectsLen(allProjects.length)
        }
        set_is_loading(false)
    }, [allProjects])

    //delete a project:
    const handleDeleteProject = (projectId) => {
        db.projects.delete(projectId)
            .then(console.log(`project ${projectId} deleted`))
            .catch(err => console.log('deleting project error:', err.message))
    }

    console.log("our projects:", dbData)
    if (dbData) {
        console.log("our projects length:", dbData.length)
    }

    return (

        <div className='app'>

            {error && <span>{error}</span>}

            {is_loading && <span>Loading...</span>}

            {dbData && <ProjectsOutput projects={dbData} handleDeleteProject={handleDeleteProject} />}
            {projectsLen === 0 && <Link to='/NP'>add new project</Link>}

        </div>

    )
}
