export const editTodo = async (userId, id, { title, completed }) => {
  try {
    const response = await fetch(`https://tt-backend-jxc4.onrender.com/users/${userId}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, completed }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update todo')
    }

    const data = await response.json()
    return { success: true, message: data.message }
  } catch (error) {
    console.error('Error updating todo:', error)
    return { success: false, error: error.message }
  }
}
