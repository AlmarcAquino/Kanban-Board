import { updateTaskList } from './board.js';

// Get all tasks and task columns
const taskTiles = document.querySelectorAll('.task');
const taskColumns = document.querySelectorAll('.task-column');

// Check each column to see if a task is being dragged over it
taskColumns.forEach((column) => {
  // Add 'is-dragging' class when task is being dragged
  column.addEventListener('dragstart', (e) => {
    if (e.target.matches('.task')) e.target.classList.add('is-dragging');
  });

  // Remove 'is-dragging' class when task is no longer being dragged
  column.addEventListener('dragend', (e) => {
    if (e.target.matches('.task')) e.target.classList.remove('is-dragging');
    updateTaskList();
  });

  column.addEventListener('dragover', (e) => {
    e.preventDefault();

    // Find the closest task below the task being dragged
    const taskBelowDragging = insertTaskAbove(column, e.clientY);
    const draggingTask = document.querySelector('.is-dragging');

    // If there is no task below the task being dragged (bottom of the column),
    // add it to the bottom of the current task column
    if (!taskBelowDragging) {
      column.appendChild(draggingTask);
    } else {
      column.insertBefore(draggingTask, taskBelowDragging);
    }
  });
});

// Find which task is the closest below the task being dragged
const insertTaskAbove = (column, cursorY) => {
  // Grab all tasks in the current column that aren't being dragged
  const currentTasksInColumn = column.querySelectorAll(
    '.task:not(.is-dragging)'
  );
  // Set closestTask to null (bottom of column)
  // Set closestOffset to negative infinity (bottom of page)
  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  currentTasksInColumn.forEach((task) => {
    // Get the top/bottom of each task in the clumn
    const { top, bottom } = task.getBoundingClientRect();
    const vertCenter = (top + bottom) / 2;
    // Find which task is closest by finding the diff
    // between the center of each task and the cursor position
    const offsetFromCenter = cursorY - vertCenter;

    if (offsetFromCenter < 0 && offsetFromCenter > closestOffset) {
      closestOffset = offsetFromCenter;
      closestTask = task;
    }
  });

  return closestTask;
};
