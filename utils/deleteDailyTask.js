const deleteDailyTask = async (userId, daily_tasksId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/users/${userId}/todos/${daily_tasksId}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete todo")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting todo:", error)
    throw error
  }
}

export default deleteDailyTask