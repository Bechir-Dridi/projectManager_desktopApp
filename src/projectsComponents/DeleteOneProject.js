import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function DeleteOneProject(projectId) {
    const history = useNavigate()
    fetch("http://localhost:8000/projects/" + projectId,
        {
            method: "DELETE"
        }).then(() => {

            console.log("project deleted");
            history('/')
        }
        )
}
