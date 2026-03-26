const deleteDailyTask = async (userId, daily_tasksId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/users/${userId}/daily_tasks/${daily_tasksId}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete dailytask")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting daily task:", error)
    throw error
  }
}

export default deleteDailyTask