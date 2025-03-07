import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskData } from "../../models/Task";
import { useGeolocation } from "../../hooks/useGeoLocation";
import "./styles.css";
import Btn from "../Shared/Btn";

interface TaskFormProps {
  onSubmit: (task: TaskData) => void;
  initialTask?: TaskData | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [text, setText] = useState(initialTask?.text || "");
  const location = useGeolocation();

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setText(initialTask.text);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;
    const newTask: TaskData = {
      taskId: initialTask?.taskId || uuidv4(),
      title,
      text,
      completionStatus: initialTask?.completionStatus || false,
      geo: location ? { ...location } : undefined,
    };
    onSubmit(newTask);
    setTitle("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task description"
      />
      <Btn type="submit" className="submit-btn">
        {initialTask ? "Update Task" : "Add Task"}
      </Btn>
    </form>
  );
};

export default TaskForm;
