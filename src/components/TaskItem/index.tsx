import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TaskData } from "../../models/Task";
import { APP_ROUTES } from "../../services/routes";
import TaskForm from "../TaskForm";
import "./styles.css";
import Modal from "../Shared/Modal";
import Btn from "../Shared/Btn";
import DeleteConfirmation from "../DeleteConfirmation";

interface TaskItemProps {
  task: TaskData;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (task: TaskData) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onToggle,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // onDelete(task.taskId);

  const onModalSubmitHandler = (task: TaskData) => {
    onEdit(task);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.taskId);
    setShowDeleteConfirmation(false); // Close the modal after deletion
  };

  return (
    <>
      {isEditing && (
        <Modal
          isOpen
          onClose={() => setIsEditing(false)}
          transitionStyle="translate"
        >
          <TaskForm
            onSubmit={(task) => onModalSubmitHandler(task)}
            initialTask={task}
          />
        </Modal>
      )}

      {showDeleteConfirmation && (
        <Modal
          isOpen
          onClose={() => setShowDeleteConfirmation(false)}
          transitionStyle="translate"
        >
          <DeleteConfirmation
            onClose={() => setShowDeleteConfirmation(false)}
            onConfirm={handleDelete}
          />
        </Modal>
      )}

      <div className="task-item">
        <div className="task-info">
          <input
            type="checkbox"
            checked={task.completionStatus}
            onChange={() => onToggle(task.taskId)}
          />
          <Link
            to={APP_ROUTES.taskDetail(task.taskId)}
            className={task.completionStatus ? "completed" : ""}
            style={{
              textDecoration: task.completionStatus ? "line-through" : "none",
            }}
          >
            {task.title}
          </Link>
        </div>
        <div className="task-actions">
          <Btn className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </Btn>

          <Btn
            className="delete-btn"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            Delete
          </Btn>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
