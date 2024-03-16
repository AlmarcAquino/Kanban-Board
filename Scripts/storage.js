export { updateStorageList };
import { addTaskToColumn } from './board.js';

const updateProjectList = () => {
  // Reset project list to avoid duplicate items
  projectArr = [];
  const currentProjects = document.querySelectorAll('.project__tile-container');
  currentProjects.forEach((project) => {
    console.log(project);
  });
};

// TODO: handle updating project list and storage list with one function
// Update project list / task list
let projectArr = [];
let taskArr = [];
const updateStorageList = (listType, listArr) => {
  switch (listType) {
    case 'task':
      console.log('task yes store');
      // Reset task arr to avoid duplicate items
      taskArr = [];
      const currentTasks = document.querySelectorAll('.task');
      currentTasks.forEach((task) => {
        let taskObj = {};
        taskObj.taskColumn = task.closest('.task-column').dataset.columnName;
        taskObj.taskTitle = task.querySelector('.task-title').innerText;
        const taskDescriptionEl = task.querySelector('.task-description');
        taskObj.taskDescription = taskDescriptionEl
          ? taskDescriptionEl.innerText
          : '';
        taskArr.push(taskObj);
      });
      storeTaskList(taskArr);
      break;

    case 'project':
      console.log('project yes store');
      break;

    default:
      break;
  }
};

// Update local storage with current task list
const storeTaskList = (taskList) => {
  const serializedTaskList = JSON.stringify(taskList);
  localStorage.setItem('taskList', serializedTaskList);
};

const displayTaskList = () => {
  const taskList = JSON.parse(localStorage.getItem('taskList'));
  // Pull information for each task on the board
  taskList.forEach((task) => {
    const { taskTitle, taskDescription, taskColumn } = task;
    const taskInfo = [taskTitle, taskDescription];
    const taskName = taskColumn;
    const isAddedFromModal = false;
    // Add each task to corresponding columns
    addTaskToColumn(taskInfo, taskName, isAddedFromModal);
  });
};

// Initialize board with tasks on page load
window.onload = () => {
  displayTaskList();
};
