import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
import Btn from "../../components/Shared/Btn";
import "./styles.css";

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, toggleTaskCompletion } = useTasks();
  const task = tasks.data.find((t) => t.taskId == id);

  if (!task) return <p>Task not found</p>;

  const handleToggle = () => {
    toggleTaskCompletion(task.taskId);
  };

  return (
    <div className="task-detail-container">
      <div className="task-detail-card">
        <Btn onClick={() => navigate(-1)} className="back-button">
          &larr; Back
        </Btn>

        <h1 className="task-title">{task.title}</h1>

        <div className="task-section">
          <h2>Description</h2>
          <p className="task-description">{task.text}</p>
        </div>

        <div className="task-section">
          <h2>Status</h2>
          <div className="completion-status">
            <span
              className={`status ${
                task.completionStatus ? "completed" : "incomplete"
              }`}
            >
              {task.completionStatus ? "Completed" : "Incomplete"}
            </span>
            <Btn onClick={handleToggle} className="toggle-button">
              Mark as {task.completionStatus ? "Incomplete" : "Completed"}
            </Btn>
          </div>
        </div>

        {task.geo ? (
          <div className="task-section">
            <h2>Geolocation</h2>
            <p className="geo-location">
              <strong>Latitude:</strong> {task.geo.lat.toFixed(4)}
              <br />
              <strong>Longitude:</strong> {task.geo.lng.toFixed(4)}
            </p>
          </div>
        ) : (
          <div className="task-section">
            <h2>Geolocation</h2>
            <p className="geo-location">No geolocation data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
