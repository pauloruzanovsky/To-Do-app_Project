import './style.css'
import {showNewTaskForm, 
        closeForm, 
        submitForm,
        editTask,
        showTodayTasks,
        showAllTasks,
        showUpcomingTasks,
        formFilledCheck,
        showNewProjectForm,
        submitProjectForm,
        submitProjectRename,
        submitEditTask,
        } from './taskForm.js'

  

const todayTasksButton = document.querySelector('.nav.task-button.today');
todayTasksButton.addEventListener('click', showTodayTasks);

const inboxTasksButton = document.querySelector('.nav.task-button.inbox');
inboxTasksButton.addEventListener('click', showAllTasks);

const upcomingTasksButton = document.querySelector('.nav.task-button.upcoming');
upcomingTasksButton.addEventListener('click', showUpcomingTasks);

const newTaskButton = document.querySelector('button.new-task')
newTaskButton.addEventListener('click',showNewTaskForm)

const editTaskButtons = document.querySelectorAll('.taskEditButton');
editTaskButtons.forEach(button => {
  button.addEventListener('click', editTask);
})

const submitEditTaskButton = document.querySelector('.submitEditTaskForm');
submitEditTaskButton.addEventListener('click', submitEditTask);

const cancelFormButton = document.querySelectorAll('.cancelForm')
cancelFormButton.forEach(button => {
  button.addEventListener('click', closeForm)  
})

const overlay = document.querySelector('.overlay');
overlay.addEventListener('click',closeForm);


window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeForm();
    }
  });

const submitFormButton = document.querySelector('.submitTaskForm')
submitFormButton.addEventListener('click', submitForm)

const newProjectButton = document.querySelector('.newProjectButton');
newProjectButton.addEventListener('click', showNewProjectForm);

const submitProjectFormButton = document.querySelector('.submitProjectForm');
submitProjectFormButton.addEventListener('click', submitProjectForm);

const submitProjectRenameButton = document.querySelector('.submitProjectRename');
submitProjectRenameButton.addEventListener('click', submitProjectRename);





formFilledCheck();