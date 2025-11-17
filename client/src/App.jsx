import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { useState, useEffect } from "react";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import RootLayout from "./Layout/RootLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import api from "./api/axios";
import Protection from "./component/Protection/Protection";
import Profile from "./pages/Profile";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; // 👈 skip if not logged in

    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks:", err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <Protection>
              <TaskList tasks={tasks} refresh={fetchTasks} />
            </Protection>
          }
        />
        <Route
          path="tasks"
          element={
            <Protection>
              <TaskForm refresh={fetchTasks} />
            </Protection>
          }
        />

        <Route
          path="/profile"
          element={
            <Protection>
              <Profile user={user} setUser={setUser} />
            </Protection>
          }
        />
        <Route path="login" element={<Login setUser={setUser}/>} />
        <Route path="signup" element={<Signup setUser={setUser}/>} />
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
};

export default App;
