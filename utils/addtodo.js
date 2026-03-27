const addTodo = async (user_id, title, completed = false) => {
  try {
    const response = await fetch('https://tt-backend-jxc4.onrender.com/create/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        title,
        completed,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create todo')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating todo:', error)
    throw error
  }
}
export default addTodo