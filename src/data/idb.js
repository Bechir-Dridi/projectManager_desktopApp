//import dexie:
import Dexie from 'dexie'


//create DB:
export var db = new Dexie("projectsDB");
db.version(1).stores({
    projects: "++id,projectName,projectDescription,tasks"
});

//ADD project:
export function addProject(project) {
    const projectName = project.savedProjectName;
    const projectDescription = project.savedProjectDescription;
    let tasks = []
    tasks = project.tasks;
    db.projects.add({
        projectName: String(projectName),
        projectDescription: String(projectDescription),
        tasks
    })
}