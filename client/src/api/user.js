import api from "./axios";

export const updateProfile = (formData) =>
  api.put("/auth/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
