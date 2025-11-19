import { useState, useEffect } from "react";
import api from "../api/axios.js";

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
        await api.put(
          `/tasks/${editingTask._id}`,
          formData
        );
      } else {
        await api.post("/tasks", formData);
        console.log("Form data", formData);
        
      }
      refresh(); // Reload task list
      setIsModalOpen(false); // Close modal
      setIsLoading(!isLoading);
    } catch (err) {
      console.error("Error saving task:", err);
      setIsLoading(!isLoading);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md animate-fadeIn"
      >
        <h2 className="text-xl font-semibold text-[#6668a3] mb-4">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h2>

        {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="border border-[#6668a3] focus:shadow-[0_0_5px_rgba(0,123,255,0.5)] focus:outline-none rounded-lg w-full p-2 mb-3"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-[#6668a3] focus:shadow-[0_0_5px_rgba(0,123,255,0.5)] focus:outline-none rounded-lg w-full p-2 mb-3"
        ></textarea>

        {/* DUE DATE */}
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate ? formData.dueDate.split("T")[0] : ""}
          onChange={handleChange}
          className="border border-[#6668a3] focus:shadow-[0_0_5px_rgba(0,123,255,0.5)] focus:outline-none rounded-lg w-full p-2 mb-3"
        />

        {/* STATUS & PRIORITY */}
        <div className="flex gap-3 mb-3">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-[#6668a3] focus:shadow-[0_0_5px_rgba(0,123,255,0.5)] focus:outline-none rounded-lg p-2 flex-1"
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border border-[#6668a3] focus:shadow-[0_0_5px_rgba(0,123,255,0.5)] focus:outline-none rounded-lg p-2 flex-1"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-[#7c7ede]"
          >
            {isLoading ? "Saving..." : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
