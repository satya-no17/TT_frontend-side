export const editTodo = async (userId, id, { current_value }) => {
  try {
    const response = await fetch(`http://localhost:5000/users/${userId}/goals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ current_value }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update goals')
    }

    const data = await response.json()
    return { success: true, message: data.message }
  } catch (error) {
    console.error('Error updating todo:', error)
    return { success: false, error: error.message }
  }
}