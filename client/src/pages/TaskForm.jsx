import { useState, useEffect } from "react";
import api from "../api/axios.js";
import useTheme from "../hooks/useTheme.js";

const TaskForm = ({ setIsModalOpen, refresh, editingTask }) => {
  // Preload existing data if editing
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    priority: "Medium",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (editingTask) setFormData(editingTask);
  }, [editingTask]);

  // Handle field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, formData);
      } else {
        await api.post("/tasks", formData);
      }
      refresh(); // Reload task list
      setIsModalOpen(false); // Close modal
      setIsLoading(false);
    } catch (err) {
      console.error("Error saving task:", err);
      setIsLoading(false);
    }
  };

  // shared input style
  const inputBase =
    "w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand transition border";

  const inputClass = `${inputBase} ${
    isDark
      ? "bg-[#171822] border-[#343648] text-gray-100 placeholder-gray-400"
      : "bg-white border-[#d6d7f5] text-gray-800 placeholder-gray-400"
  }`;

  const selectClass = `${inputBase} ${
    isDark
      ? "bg-[#171822] border-[#343648] text-gray-100"
      : "bg-white border-[#d6d7f5] text-gray-800"
  }`;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isDark ? "bg-black/60" : "bg-black/35"
      } backdrop-blur-sm z-50`}
      onClick={() => setIsModalOpen(false)}
    >
      {/* stop click bubbling so clicks inside the card don’t close it */}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`w-[90%] max-w-md rounded-2xl shadow-xl border p-6 sm:p-7 animate-fadeIn
          ${
            isDark
              ? "bg-[#11121a] border-[#292a36] text-gray-100"
              : "bg-white/95 border-[#e1e2f1] text-gray-900"
          }`}
      >
        <h2
          className={`text-xl font-semibold mb-5 ${
            isDark ? "text-gray-50" : "text-[#6668a3]"
          }`}
        >
          {editingTask ? "Edit Task" : "Add New Task"}
        </h2>

        {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className={inputClass + " mb-3"}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={inputClass + " mb-3 resize-none"}
        />

        {/* DUE DATE */}
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate ? formData.dueDate.split("T")[0] : ""}
          onChange={handleChange}
          className={inputClass + " mb-4"}
        />

        {/* STATUS & PRIORITY */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={selectClass}
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={selectClass}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition
              ${
                isDark
                  ? "bg-[#1f202b] text-gray-200 border-[#3b3d52] hover:bg-[#272936]"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-sm font-semibold rounded-lg text-white shadow-sm transition
              ${
                isDark
                  ? "bg-brand-dark hover:bg-brand"
                  : "bg-brand hover:bg-brand-dark"
              }`}
          >
            {isLoading ? "Saving..." : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
