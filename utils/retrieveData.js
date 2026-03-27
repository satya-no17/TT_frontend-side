const retrieveData = async (userId) => {
  try {
    const response = await fetch(`https://tt-backend-jxc4.onrender.com/users/${userId}/dashboard`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'failed to retrieve')
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error('unable to retrieve data =>', error)
    throw error
  }
}

export default retrieveData