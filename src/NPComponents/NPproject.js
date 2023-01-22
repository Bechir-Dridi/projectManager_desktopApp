import React from 'react'
import "../index.css"

export default function NPproject({ projectName, setProjectName, projectDescription, setProjectDescription, savedProjectName, savedProjectDescription, handleProjectSave }) {

    return (
        <div className='NPproject-container'>
            {/* NPproject.js */}
            <form onSubmit={handleProjectSave}>
                <div className="project-form">
                    <p>
                        <label htmlFor="projectName">enter project name</label>
                        <input className='input'
                            placeholder='name'
                            maxLength={40}
                            required
                            value={projectName}
                            onChange={e => setProjectName(e.target.value)}
                        />
                    </p>

                    <p>
                        <label htmlFor="projectDescription">enter project Description</label>
                        <textarea
                            className='input'
                            placeholder='description'
                            required
                            value={projectDescription}
                            onChange={e => setProjectDescription(e.target.value)}
                        />
                    </p>

                    <div className='submitButton'>
                        <button>save</button>
                    </div>
                </div>
            </form>
            <div className='project-basic-infos-container'>
                <p><span>project Name:</span> {savedProjectName}</p>
                <p><span>project Description:</span> {savedProjectDescription}</p>
            </div>
        </div>
    )
}
