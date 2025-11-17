import React from 'react'

const Protection = ({children}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return null; // Prevent rendering while redirecting
  }
  return (
    <>{children}</>
  )
}

export default Protection