import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTasks } from "../services/api";
import { Task, TaskData } from "../models/Task";
import { TASKS_LOCAL_STORAGE_KEY } from "../constants";

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Fetch tasks (only once, from API or local storage)
  const {
    data: tasks = { data: [] },
    isLoading,
    error,
  } = useQuery<Task>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Add task (local storage only)
  const addTask = (task: TaskData) => {
    const newTasks = { data: [...tasks.data, task] };
    localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    queryClient.setQueryData<Task>(["tasks"], newTasks);
  };

  // Edit task (local storage only)
  const editTask = (updatedTask: TaskData) => {
    const newTasks = {
      data: tasks.data.map((t) =>
        t.taskId === updatedTask.taskId ? updatedTask : t
      ),
    };
    localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    queryClient.setQueryData<Task>(["tasks"], newTasks);
  };

  // Delete task (local storage only)
  const deleteTask = (taskId: string) => {
    const newTasks = { data: tasks.data.filter((t) => t.taskId !== taskId) };
    localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    queryClient.setQueryData<Task>(["tasks"], newTasks);
  };

  // Toggle task completion (local storage only)
  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = {
      data: tasks.data.map((t) =>
        t.taskId === taskId
          ? { ...t, completionStatus: !t.completionStatus }
          : t
      ),
    };
    localStorage.setItem(TASKS_LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    queryClient.setQueryData<Task>(["tasks"], updatedTasks);
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
  };
};
