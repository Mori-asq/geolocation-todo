import React from "react";
import TaskItem from "../TaskItem";
import { TaskData } from "../../models/Task";
import "./styles.css";

interface TaskListProps {
  tasks: TaskData[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (task: TaskData) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks = [],
  onDelete,
  onToggle,
  onEdit,
}) => {
  const completedTasks = tasks.filter((task) => task.completionStatus);
  const incompleteTasks = tasks.filter((task) => !task.completionStatus);

  return (
    <div className="task-list">
      <h2>Incomplete Tasks</h2>
      {incompleteTasks.length === 0 && <p>No incomplete tasks</p>}
      {incompleteTasks.map((task) => (
        <TaskItem
          key={task.taskId}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}

      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 && <p>No completed tasks</p>}
      {completedTasks.map((task) => (
        <TaskItem
          key={task.taskId}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
