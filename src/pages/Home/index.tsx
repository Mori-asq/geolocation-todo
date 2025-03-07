import React from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import ThemeToggler from "../../components/ThemeToggler";
import "./styles.css";

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

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="home">
      <div className="header">
        <h1>To-Do List</h1>

        <ThemeToggler />
      </div>

      <TaskForm onSubmit={addTask} />

      {tasks.data && (
        <TaskList
          tasks={tasks.data}
          onDelete={deleteTask}
          onToggle={toggleTaskCompletion}
          onEdit={editTask}
        />
      )}
    </div>
  );
};

export default Home;
