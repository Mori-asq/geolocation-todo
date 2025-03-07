import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetail from "./pages/TaskDetail";
import { APP_ROUTES } from "./services/routes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={APP_ROUTES.home} element={<Home />} />
        <Route path={APP_ROUTES.routerTaskDetail} element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
