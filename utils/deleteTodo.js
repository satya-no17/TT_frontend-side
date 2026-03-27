const deleteTodo = async (userId, todoId) => {
  try {
    const response = await fetch(
      `https://tt-backend-jxc4.onrender.com/users/${userId}/todos/${todoId}`,
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

export default deleteTodo