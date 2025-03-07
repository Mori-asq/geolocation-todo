# Task Management Application

A robust and user-friendly task management application built with **React**, **Vite**, and **TypeScript**. This application allows users to create, edit, delete, and mark tasks as complete or incomplete. It also integrates geolocation data for tasks and provides a seamless user experience with modals for task creation and editing.

---

## Features

### **1. Task Management**

- **Add Tasks**: Users can create new tasks with a title, description, and optional geolocation data.
- **Edit Tasks**: Users can modify the title and description of existing tasks.
- **Delete Tasks**: Tasks can be deleted with a confirmation prompt.
- **Mark Tasks as Complete/Incomplete**: Users can toggle the completion status of tasks.
- **Task Persistence**: Tasks are saved in the browser's local storage, ensuring data persistence across sessions.

### **2. Geolocation Integration**

- **Automatic Geolocation Fetching**: The application fetches the user's geolocation (latitude and longitude) when a task is created.
- **Geolocation Expiry Handling**: The geolocation data is refreshed every 10 minutes to ensure it remains up-to-date.
- **Fallback Mechanism**: If geolocation fetching fails (e.g., due to a timeout), the application uses the last valid geolocation stored in local storage.

### **3. User Interface**

- **Modal for Task Creation/Editing**: A reusable modal component is used for creating and editing tasks, providing a clean and intuitive user interface.
- **Task List Organization**: Tasks are categorized into **Incomplete** and **Completed** sections for better organization.
- **Strikethrough Effect**: Completed tasks are visually distinguished with a strikethrough effect on their titles.

### **4. Error Handling**

- **Geolocation Errors**: Handles geolocation errors gracefully by falling back to the last valid location.
- **API Error Handling**: Provides error messages for failed API calls (e.g., fetching tasks).

### **5. Responsive Design**

- The application is designed to be responsive and works seamlessly across different devices and screen sizes.

---

## Technologies Used

- **Frontend**:

  - React
  - Vite (for fast development and builds)
  - TypeScript (for type safety)
  - React Query (for data fetching and state management)
  - CSS Modules (for scoped styling)

- **Geolocation**:

  - Browser Geolocation API

- **Local Storage**:

  - Used for persisting tasks and geolocation data.

- **UI Components**:
  - Custom Modal Component
  - Custom Button Component

---
