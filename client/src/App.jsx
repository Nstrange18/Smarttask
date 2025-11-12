import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./component/TaskForm";
import TaskList from "./component/TaskList";
import RootLayout from "./Layout/RootLayout";
import Login from "./component/Login";
import Signup from "./component/Signup";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    console.log("Fetched tasks:", res.data);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<TaskList tasks={tasks} refresh={fetchTasks}/>} />
        <Route path="tasks" element={<TaskForm refresh={fetchTasks} />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    )
  );

  return (
    <div>
      {/* <TaskForm refresh={fetchTasks} />
      <TaskList tasks={tasks} refresh={fetchTasks} /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
