const addGoals = async (user_id, title, target_value, type) => {
    try {
        const response = await fetch('http://localhost:5000/create/goal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                title,
                target_value,
                type
            }),
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to create goal')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating Goals:', error)
        throw error
    }
}


export default addGoals