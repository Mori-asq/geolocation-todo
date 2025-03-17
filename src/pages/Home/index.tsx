import React, { useEffect, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import ThemeToggler from "../../components/ThemeToggler";
import "./styles.css";
import { TaskData } from "../../models/Task";

const Home: React.FC = () => {
  const {
    tasks,
    isLoading,
    error,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
  } = useTasks();
  const [query, setQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    if (!tasks.data) return;
   
    setFilteredTasks(tasks.data?.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    ))
  }, [query, tasks.data]);

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="home">
      <div className="header">
        <h1>To-Do List</h1>

        <ThemeToggler />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search"
      />

      <TaskForm onSubmit={addTask} />

      {filteredTasks && (
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTaskCompletion}
          onEdit={editTask}
        />
      )}
    </div>
  );
};

export default Home;
