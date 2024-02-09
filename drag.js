// Get all tasks and task columns
const taskTiles = document.querySelectorAll('.task');
const taskColumns = document.querySelectorAll('.task-column');

// Add 'is-dragging' class when task is being dragged
// Remove 'is-dragging' class when task is no longer being dragged
taskTiles.forEach((task) => {
  task.addEventListener('dragstart', () => {
    task.classList.add('is-dragging');
  });
  task.addEventListener('dragend', () => {
    task.classList.remove('is-dragging');
  });
});

// Check each column to see if a task is being dragged over it
taskColumns.forEach((column) => {
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

//
const insertTaskAbove = (column, cursorY) => {
  // Grab all tasks in the current column that aren't being dragged
  const currentTasksInColumn = column.querySelectorAll(
    '.task:not(.is-dragging)'
  );

  // Set closestTask to null (bottom of column)
  // Set closestOffset to negative infinity (bottom of page)
  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  //
  currentTasksInColumn.forEach((task) => {
    // Get the top of each task in the clumn
    const { top } = task.getBoundingClientRect();
    const offsetFromTop = cursorY - top;

    if (offsetFromTop < 0 && offsetFromTop > closestOffset) {
      closestOffset = offsetFromTop;
      closestTask = task;
    }
  });

  return closestTask;
};
