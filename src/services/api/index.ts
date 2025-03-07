import { TASKS_LOCAL_STORAGE_KEY } from "../../constants";
import { Task, TaskData } from "../../models/Task";
import { API_ROUTES } from "../routes";

// Fetch initial tasks from API (only once)
export const fetchTasks = async (): Promise<Task> => {
  // Check if tasks already exist in local storage
  const storedTasks = localStorage.getItem(TASKS_LOCAL_STORAGE_KEY);
  if (storedTasks) {
    return JSON.parse(storedTasks); // Return tasks from local storage
  }

  // Fetch tasks from API (only if local storage is empty)
  const response = await fetch(API_ROUTES.get_all_tasks);
  if (!response.ok) throw new Error("Error fetching tasks");

  const tasks = await response.json();
  localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(tasks)); // Save to local storage
  return tasks;
};

// Add a new task via API
export const addTaskAPI = async (task: TaskData): Promise<TaskData> => {
  const response = await fetch(API_ROUTES.post_one_task, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Error adding task");
  return response.json();
};

// Edit task via API
export const editTaskAPI = async (task: TaskData): Promise<TaskData> => {
  const response = await fetch(API_ROUTES.edit_one_task, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Error editing task");
  return response.json();
};

// Delete task via API
export const deleteTaskAPI = async (
  taskId: string
): Promise<{ success: boolean }> => {
  const response = await fetch(API_ROUTES.delete_one_task, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: taskId }),
  });
  if (!response.ok) throw new Error("Error deleting task");
  return response.json();
};
