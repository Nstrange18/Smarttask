import Navbar from "./Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import TaskForm from "./TaskForm";

const TaskList = ({ tasks: initialTasks, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [sortType, setSortType] = useState("");

  // Update filters
  const handleFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  // Update sort
  const handleSort = (type) => {
    setSortType(type);
  };

  // Apply filters and sorting
  const processedTasks = filteredTasks
    .filter((task) => {
      const statusMatch = !filters.status || task.status === filters.status;
      const priorityMatch =
        !filters.priority || task.priority === filters.priority;
      return statusMatch && priorityMatch;
    })
    .sort((a, b) => {
      if (sortType === "dateAsc")
        return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortType === "dateDesc")
        return new Date(b.dueDate) - new Date(a.dueDate);
      if (sortType === "priority") {
        const order = { High: 3, Medium: 2, Low: 1 };
        return order[b.priority] - order[a.priority];
      }
      return 0;
    });

  useEffect(() => {
    handleSearch(searchTerm);
  }, [initialTasks]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredTasks(initialTasks);
      return;
    }
    const results = initialTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(term.toLowerCase()) ||
        task.description.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredTasks(results);
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span
          key={i}
          className="bg-[#e4e3ff] text-[#5a5dcf] font-semibold rounded px-1 transition-all duration-200"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    refresh();
  };

  const handleComplete = async (id, status) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
    refresh();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[gainsboro] pb-10">
      <div className="bg-white max-w-4/5 min-w-38/100 w-full h-auto rounded-lg shadow-md flex flex-col items-center justify-between my-2 pb-10">
        <Navbar
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          filters={filters}
          sortType={sortType}
        />

        {filteredTasks.length === 0 ? (
          <p className="pt-6 text-[#6668a3] font-medium text-center">
            No matching tasks found.
          </p>
        ) : (
          processedTasks.map((task) => (
            <div
              key={task._id}
              className="w-4/5 bg-white/90 backdrop-blur-md border border-[#e2e4ff] rounded-3xl shadow-md 
              p-5 mt-5 animate-fadeIn hover:shadow-lg hover:shadow-[#d6d8ff]/50 
              transition-all duration-500 ease-in-out transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[1.25rem] font-semibold text-[#5c5fbf] leading-tight">
                    {highlightText(task.title, searchTerm)}
                  </h3>
                  <p className="text-[0.95rem] text-gray-700 italic">
                    {highlightText(task.description, searchTerm)}
                  </p>

                  <div className="text-sm mt-2 space-y-1">
                    <p className="text-gray-500">
                      <span className="font-medium text-[#6668a3]">Due:</span>{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toDateString()
                        : "No date"}
                    </p>

                    <p
                      className={`text-gray-600 ${
                        task.status === "Completed"
                          ? "text-green-600 font-medium"
                          : "text-[#6668a3]"
                      }`}
                    >
                      Status: {task.status}
                    </p>

                    <p
                      className={`text-sm font-medium ${
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
                      className="mt-3 px-3 py-1 bg-[#9395D3]/20 text-[#5e62ce] rounded-lg 
                     hover:bg-[#9395D3]/40 font-medium transition-all duration-300 
                     ease-in-out hover:scale-105"
                      onClick={() => {
                        handleComplete(task._id, "Completed");
                        setIsComplete(!isComplete);
                      }}
                    >
                      Mark Complete
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-3 items-end">
                  <FiEdit
                    className="text-blue-600 cursor-pointer hover:scale-110 transition-transform duration-200"
                    onClick={() => handleEdit(task)}
                  />
                  <FiTrash2
                    className="text-red-700 cursor-pointer hover:scale-110 transition-transform duration-200"
                    onClick={() => handleDelete(task._id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}

        {/* Floating Add Button */}
        <button
          className="fixed bottom-8 right-38 bg-[#9395D3] hover:bg-[#6267f3] text-white p-5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none animate-bounce-slow"
          aria-label="Add task"
          title="Add task"
          onClick={handleAdd}
        >
          <FiPlus size={24} />
        </button>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <TaskForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          refresh={refresh}
          editingTask={editingTask} // ✅ passes selected task
        />
      )}
    </div>
  );
};

export default TaskList;
