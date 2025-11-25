import Navbar from "../component/Navbar.jsx";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import TaskForm from "./TaskForm.jsx";
import api from "../api/axios.js";
import swal from "sweetalert";
import useTheme from "../hooks/useTheme.js";

const TaskList = ({ tasks: initialTasks, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [sortType, setSortType] = useState("");

  const { theme } = useTheme();
  const isDark = theme === "dark";

  // ========== FILTER HANDLERS ==========
  const handleFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleSort = (type) => setSortType(type);

  // Apply filters + sorting
  const processedTasks = filteredTasks
    .filter((task) => {
      const statusMatch = !filters.status || task.status === filters.status;
      const priorityMatch =
        !filters.priority || task.priority === filters.priority;
      return statusMatch && priorityMatch;
    })
    .sort((a, b) => {
      if (sortType === "dateAsc") return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortType === "dateDesc") return new Date(b.dueDate) - new Date(a.dueDate);
      if (sortType === "priority") {
        const order = { High: 3, Medium: 2, Low: 1 };
        return order[b.priority] - order[a.priority];
      }
      return 0;
    });

  // ========== SEARCH LOGIC ==========
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTasks(initialTasks);
      return;
    }

    const lower = searchTerm.toLowerCase();
    const results = initialTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lower) ||
        task.description.toLowerCase().includes(lower)
    );

    setFilteredTasks(results);
  }, [initialTasks, searchTerm]);

  const handleSearch = (term) => setSearchTerm(term);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-[#cfd2ff]/40 text-[#6b6fff] font-semibold px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // ========== CRUD ==========
  const handleDelete = (id) => {
    swal({
      title: "Delete Task?",
      text: "You cannot undo this action.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (deleteNow) => {
      if (deleteNow) {
        await api.delete(`/tasks/${id}`);
        refresh();
        swal("Deleted!", "Task removed successfully.", "success");
      }
    });
  };

  const handleComplete = async (id, status) => {
    swal("Task Completed!", "Great work ✔", "success");
    await api.put(`/tasks/${id}`, { status });
    refresh();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* overlay */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-20 w-[calc(100%-5rem)] h-full bg-black/40 backdrop-blur-sm z-50"
          onClick={() => setIsModalOpen(false)}
        />
      )}

      {/* MAIN WRAPPER */}
      <div
        className={`w-full min-h-screen flex flex-col items-center pb-10 transition-colors duration-300 
        ${
          isDark
            ? "bg-[#0d0f18]" // soft charcoal blue
            : "bg-[#f1f1f7]"
        }`}
      >
        {/* CARD WRAPPER */}
        <div
          className={`max-w-5xl w-[90%] rounded-xl shadow-md mt-4 pb-12 
          ${isDark ? "bg-[#141726]" : "bg-white"}`}
        >
          <Navbar
            onSearch={handleSearch}
            onFilter={handleFilter}
            onSort={handleSort}
            filters={filters}
            sortType={sortType}
          />

          {/* EMPTY STATE */}
          {processedTasks.length === 0 ? (
            <p className="pt-6 text-center text-[#6668a3] font-medium">
              No matching tasks found.
            </p>
          ) : (
            processedTasks.map((task) => (
              <div
                key={task._id}
                className={`rounded-xl w-[90%] mx-auto p-5 mt-5 transition-all border
                ${
                  isDark
                    ? "bg-[#1b1e2d] border-[#2c3150]"
                    : "bg-white border-[#e2e4ff]"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <h3
                      className={`text-[1.25rem] font-semibold ${
                        isDark ? "text-[#b8b9ff]" : "text-accent"
                      }`}
                    >
                      {highlightText(task.title, searchTerm)}
                    </h3>

                    <p
                      className={`italic break-all text-[0.95rem] ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {highlightText(task.description, searchTerm)}
                    </p>

                    {/* META */}
                    <div className="text-sm mt-2 space-y-1">
                      <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                        <span className="font-medium text-[#6668a3]">Due:</span>{" "}
                        {task.dueDate
                          ? new Date(task.dueDate).toDateString()
                          : "No date"}
                      </p>

                      <p
                        className={
                          task.status === "Completed"
                            ? "text-green-400 font-medium"
                            : isDark
                            ? "text-[#9fa1ff]"
                            : "text-[#6668a3]"
                        }
                      >
                        Status: {task.status}
                      </p>

                      <p
                        className={`font-medium ${
                          task.priority === "High"
                            ? "text-red-500"
                            : task.priority === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        Priority: {task.priority}
                      </p>
                    </div>

                    {task.status !== "Completed" && (
                      <button
                        className={`mt-3 px-3 py-1 rounded-lg font-medium transition-all 
                        ${
                          isDark
                            ? "bg-[#4f52d3]/30 text-[#878bff] hover:bg-[#5d60f0]/40"
                            : "bg-brand/20 text-[#5e62ce] hover:bg-brand/40"
                        }`}
                        onClick={() => handleComplete(task._id, "Completed")}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col gap-3">
                    <FiEdit
                      className="text-blue-500 cursor-pointer hover:scale-110 transition"
                      onClick={() => handleEdit(task)}
                    />
                    <FiTrash2
                      className="text-red-500 cursor-pointer hover:scale-110 transition"
                      onClick={() => handleDelete(task._id)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}

          {/* ADD BUTTON */}
          <button
            className={`fixed bottom-8 right-10 p-5 rounded-full shadow-lg transition-all 
              ${
                isDark
                  ? "bg-[#7f82ff] hover:bg-[#9a9dff]"
                  : "bg-brand hover:bg-[#6267f3]"
              } text-white hover:scale-110`}
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
          >
            <FiPlus size={24} />
          </button>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-100">
            <TaskForm
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              refresh={refresh}
              editingTask={editingTask}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
