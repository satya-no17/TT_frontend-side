export const editDailyTask = async (userId, id, { title, date, completed }) => {
  try {
    const response = await fetch(`https://tt-backend-jxc4.onrender.com/users/${userId}/daily_tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, completed }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update daily task')
    }

    const data = await response.json()
    return { success: true, message: data.message, task: data.task }
  } catch (error) {
    console.error('Error updating daily task:', error)
    return { success: false, error: error.message }
  }
}