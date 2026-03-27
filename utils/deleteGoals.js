const deleteGoals = async(userId,Id)=>{
    try {
    const response = await fetch(
      `https://tt-backend-jxc4.onrender.com/users/${userId}/goals/${Id}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete goal")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting goal:", error)
    throw error
  }
}
export default deleteGoals