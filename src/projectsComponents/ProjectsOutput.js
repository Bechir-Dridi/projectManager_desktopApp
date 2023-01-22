import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import { BsTrash } from "react-icons/bs"
import { IconContext } from "react-icons"


export default function ProjectsOutput({ projects, handleDeleteProject }) {
    // delete a project:
    // const history = useNavigate()
    // const handleDeleteProject = (projectId) => {
    //     fetch("http://localhost:8000/projects/" + projectId,
    //     fetch("/delete/" + projectId,
    //         {
    //             method: "DELETE"
    //         }).then(
    //             console.log("project was deleted"),
    //             history('/')
    //         )
    // }
    return (
        <div className='projects-output-container'>
            {projects.map((project, i) => (
                <div key={i} >
                    <tr>
                        <Link to={`projects/${project.id}`}>
                            <td> project {i + 1}</td>
                            <td>{project.projectName}</td>

                        </Link>
                        <IconContext.Provider value={{ color: "white", size: "2rem", title: "icon" }}>
                            <td> <button onClick={() => handleDeleteProject(project.id)}><BsTrash /></button> </td>
                        </IconContext.Provider>
                    </tr>
                </div>
            )
            )}
        </div>
    )
}
