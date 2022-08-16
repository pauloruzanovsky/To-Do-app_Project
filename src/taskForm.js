import { format, parseISO } from 'date-fns'

const taskName = document.getElementById('taskName');
const taskDescription = document.getElementById('taskDescription');
const taskDate = document.getElementById('taskDate');
const taskProject = document.getElementById('projectDropdown');
const taskListDOM = document.querySelector('div.tasks');
const newTaskForm = document.querySelector('form')
const overlay = document.querySelector('.overlay')
const todayDate = parseISO(format(new Date(),"yyyy-MM-dd"));
const submitFormButton = document.querySelector('.submitTaskForm');
const newProjectDOM = document.querySelector('.newProjectForm');
const projectsListDOM = document.querySelector('.projectsList');
const newProjectName = document.getElementById('newProjectName');
const mainTitle = document.querySelector('.mainTitle');
const select = document.querySelector('select');
const projectMenu = document.getElementById('project-menu');
const renameProjectButton =document.getElementById('renameProject');
const deleteProjectButton = document.getElementById('deleteProject');
const renameProjectDOM = document.querySelector('.renameProjectForm');
const projectRenameInput = document.querySelector('#projectRename');
const submitRenameButton = document.querySelector('.submitProjectRename');
const submitNewProjectButton = document.querySelector('.submitProjectForm');
const allTasks = [];
const allProjects = [];


class Task {
    constructor(name,description,date,project) {
        this.name = name;
        this.description = description;
        this.date = parseISO(date);
        this.project = project;
        this.key = (this.name+this.description+this.date+this.project);

    }
}

class Project {
    constructor(name) {
        this.name = name;
    }
}

const task1 = new Task('Water plants', 'Water roses and daisies today', '2022-08-03','Chores');
const task2 = new Task('Go to gym', 'Leg day', '2022-08-12','Gym');
const project1 = new Project('Gym');
const project2 = new Project('Chores');



allTasks.push(task1, task2);
allProjects.push(project1, project2);
    allProjects.forEach(project => {
        select.options.add(new Option(`${project.name}`,`${project.name}`))
    
    })


showAllTasks();


export function showNewTaskForm() {
    
    newTaskForm.classList.add('active');
    overlay.classList.add('active');


}

export function formFilledCheck() {
    document.onchange = (e) => {
        if (e.target.tagName === 'INPUT') {
          const canSubmit = [...document.forms.taskForm.querySelectorAll('input')]
            .every(i => {
              return i.value
            })
          document.forms.taskForm.querySelector('button.submitTaskForm').disabled = !canSubmit
        }
      }

    document.onkeyup = (e) => {
    if (e.target.tagName === 'INPUT') {
        const canSubmitTaskForm = [...document.forms.taskForm.querySelectorAll('input')]
        const canSubmitProjectRename = [...document.forms.renameProjectForm.querySelectorAll('input')]
        const canSubmitNewProject = [...document.forms.newProjectForm.querySelectorAll('input')]

        .every(i => {
            return i.value
        })
        document.forms.taskForm.querySelector('button.submitTaskForm').disabled = !canSubmitTaskForm
        document.forms.renameProjectForm.querySelector('button.submitProjectRename').disabled = !canSubmitProjectRename
        document.forms.newProjectForm.querySelector('button.submitProjectForm').disabled = !canSubmitNewProject

    }
    }
}

export function closeForm() {
    newTaskForm.classList.remove('active');
    newProjectDOM.classList.remove('active');
    overlay.classList.remove('active');
    projectMenu.classList.remove('active');
    renameProjectDOM.classList.remove('active');
    newTaskForm.reset();
    newProjectDOM.reset();
    renameProjectDOM.reset();
    disableSubmitButton();

}

export function disableSubmitButton() {
    submitFormButton.disabled = true;
    submitRenameButton.disabled = true;
    submitNewProjectButton.disabled = true;
}

export function submitForm(e) {
    e.preventDefault();
    const task = new Task(taskName.value, taskDescription.value, taskDate.value, taskProject.value);
    allTasks.push(task);
    closeForm();
    showAllTasks();
}

export function deleteTaskList() {
    
    while(taskListDOM.firstChild) {
        taskListDOM.removeChild(taskListDOM.firstChild);
    }
}


export function deleteTask() {
    const completeTaskButtons = document.querySelectorAll('.taskCheckbox');
    completeTaskButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonIndex = button.getAttribute('index');
            if(mainTitle.textContent === "Inbox") {
                allTasks.splice(buttonIndex,1);   
                showAllTasks();

            } else if(mainTitle.textContent === "Today") {
                const todayTasks = allTasks.filter(task => task.date.getTime() <= todayDate.getTime());
                const index = allTasks.findIndex(task => {
                    return task.key === todayTasks[buttonIndex].key;
                }) 
                allTasks.splice(index,1); 
                showTodayTasks();

            } else if(mainTitle.textContent === "Upcoming") {
                const upcomingTasks = allTasks.filter(task => task.date.getTime() > todayDate.getTime());
                const index = allTasks.findIndex(task => {
                    return task.key === upcomingTasks[buttonIndex].key;
                }) 
                allTasks.splice(index,1); 
                showUpcomingTasks();
            } else {
                const projectTasks = allTasks.filter(task => task.project === mainTitle.textContent);
                const index = allTasks.findIndex(task => {
                task.key === projectTasks[buttonIndex].key;
                }) 
                allTasks.splice(index,1); 
                updateProjectTasks();
            }
            })
    })   
    }


export function showAllTasks() {
    deleteTaskList();
    inputTaskIntoDOM(allTasks);
    mainTitle.textContent = "Inbox";
    deleteTask();

}

export function showTodayTasks() {
    const todayTasks = allTasks.filter(task => task.date.getTime() <= todayDate.getTime());
    deleteTaskList();
    inputTaskIntoDOM(todayTasks);
    mainTitle.textContent = "Today";
    deleteTask();

}

export function showProjectTasks() {
        const projectTasks = allTasks.filter(task => task.project === mainTitle.textContent);
        deleteTaskList();
        inputTaskIntoDOM(projectTasks);
        deleteTask();

}

export function showUpcomingTasks() {
    const upcomingTasks = allTasks.filter(task => task.date.getTime() > todayDate.getTime());
    deleteTaskList();
    inputTaskIntoDOM(upcomingTasks);
    mainTitle.textContent = "Upcoming";
    deleteTask();


    
}

export function createNewTaskDOM(counter) {
    const taskDOM = document.createElement('div');
    taskDOM.className = `task`;
    taskDOM.setAttribute('index',counter);
    taskDOM.innerHTML = `   <div class="container">
                                <div class="round">
                                <input type="checkbox" class="taskCheckbox" id="checkbox-${counter}" index="${counter}" />
                                <label for="checkbox-${counter}"></label>
                                </div>
                            </div>
                            <div class="taskInfo">
                                <div class="taskName-${counter}"></div>
                                <div class="taskDescription-${counter}" ></div>
                                <div class="taskDate-${counter}"></div>
                                <div class="taskProject-${counter}"></div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="taskEditButton" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621Z"/><path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"/></g></svg>`
    taskListDOM.append(taskDOM);
}

export function inputTaskIntoDOM(array){
    array.forEach(task => {
        const taskPosition = array.indexOf(task);
        createNewTaskDOM(taskPosition);
        const taskNameDOM = document.querySelector(`.taskName-${taskPosition}`);
        const taskDescriptionDOM = document.querySelector(`.taskDescription-${taskPosition}`);
        const taskDateDOM = document.querySelector(`.taskDate-${taskPosition}`);
        const taskProjectDOM = document.querySelector(`.taskProject-${taskPosition}`);

        taskNameDOM.textContent = task.name;
        taskDescriptionDOM.textContent = task.description;
        taskDateDOM.textContent = format(task.date,'dd/MM/yyyy');
        taskProjectDOM.textContent = task.project;
        

    })

}

export function updateCurrentTaskList() {
    if(mainTitle.textContent ==='Today') 
    return showTodayTasks();
    
    if(mainTitle.textContent ==='Inbox') 
    return showAllTasks();

    if(mainTitle.textContent ==='Upcoming')
    return showUpcomingTasks();
    
    return showProjectTasks();
}
    
// Projects related functions
export function showNewProjectForm() {
    newProjectDOM.classList.add('active');
    overlay.classList.add('active');

}

export function submitProjectForm(e) {
    e.preventDefault();
    const project = new Project(newProjectName.value);
    allProjects.push(project);
    console.log(allProjects);
    inputProjectsIntoDOM(allProjects);
    closeForm();
    select.options.add(new Option(project.name,project.name));
    }

export function refreshProjectsDOM(counter) {
    const newProject = document.createElement('div');
    newProject.innerHTML = `<div class="projectName"></div>
                            <div class="projectOptions"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"/></svg>                  
                            </div>` 
    newProject.id =`project-${counter}`;
    newProject.className = 'project';
    projectsListDOM.append(newProject);

}

export function inputProjectsIntoDOM(array) {
    deleteProjectsList();
    array.forEach(project => {
        const projectPosition = array.indexOf(project);

        refreshProjectsDOM(projectPosition);

        const projectNameDOM = document.querySelector(`#project-${projectPosition}>.projectName`);
        projectNameDOM.textContent = project.name;
        

    })
    showProjectTasksOnClick();
    refreshProjectOptions();



}

inputProjectsIntoDOM(allProjects);




export  function deleteProjectsList() {
    while(projectsListDOM.firstChild) {
        projectsListDOM.removeChild(projectsListDOM.firstChild);
    }
}

export function updateProjectTasks() {
    const projectTasks = allTasks.filter(task => task.project === mainTitle.textContent);
    
    deleteTaskList();
    inputTaskIntoDOM(projectTasks);
    deleteTask();
}

export function showProjectTasksOnClick() {
    const projects = document.querySelectorAll('.projectName');
    projects.forEach(project => {
        project.addEventListener('click', () => {
            const projectName = project.textContent;
            mainTitle.textContent = projectName;
            showProjectTasks();
        })
    })
}
export function deleteProject(projectName) {
    allTasks.forEach(task => {
        if(task.project === projectName) {
            allTasks.splice(allTasks.indexOf(task),1);
        }})
    allProjects.forEach(project => {
        if(project.name === projectName) {
            allProjects.splice(allProjects.indexOf(project),1);
    }})
    
    for(let i = 0; i < taskProject.options.length; i++) {
        const optionValue = taskProject.options[i].value;
        if(optionValue === projectName) {
            taskProject.remove(i);
    }
}
}

updateCurrentTaskList();

export function refreshProjectOptions() {
    const projectOptionButtons = document.querySelectorAll('.projectOptions');
    projectOptionButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                console.log(button.parentElement.firstChild.textContent);
                event.preventDefault();
                const { clientX: mouseX, clientY: mouseY } = event;
                projectMenu.style.top = `${mouseY}px`;
                projectMenu.style.left = `${mouseX}px`;
                overlay.classList.add('active');
                projectMenu.setAttribute("project", button.parentElement.firstChild.textContent);
                projectMenu.classList.add('active');
            });
        });
    }

deleteProjectButton.addEventListener("click", () => {
        const projectName = projectMenu.getAttribute('project');
        console.log(allProjects.indexOf())
            if(mainTitle.textContent === projectName) {
                showAllTasks();
            }
                deleteProject(projectName);
                inputProjectsIntoDOM(allProjects);
                closeForm();
                updateCurrentTaskList();

    }
    )

renameProjectButton.addEventListener("click", () => {
    renameProjectDOM.classList.add('active');
    overlay.classList.add('active');


})

export function submitProjectRename(e) {
    e.preventDefault();
    const projectName = projectMenu.getAttribute('project');
    allProjects.forEach(project => {
        if(project.name === projectName) {
            project.name = projectRenameInput.value;
        }
    })
    inputProjectsIntoDOM(allProjects);

    allTasks.forEach(task => {
        if(task.project === projectName) {
            task.project = projectRenameInput.value;
        }
    })

    for(let i = 0; i < taskProject.options.length; i++) {
        console.log(taskProject.options[i].value);
        console.log(projectName);
        console.log(projectRenameInput.value);
        if(taskProject.options[i].value === projectName) {
            taskProject.options[i].value = projectRenameInput.value;
            taskProject.options[i].textContent = projectRenameInput.value;
        }
    }

    if(mainTitle.textContent === projectName) {
        mainTitle.textContent = projectRenameInput.value;
    }
    updateCurrentTaskList();
    closeForm();
}