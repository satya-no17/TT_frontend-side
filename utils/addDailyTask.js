
export default addDailyTask = async (user_id, title, completed = false) => {
    try {
        const now = new Date()

        const formatted = now.toLocaleDateString()

        const response = await fetch('http://localhost:5000/create/daily_taks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id, title, completed, date: formatted
            })
        })
        if (!response.ok) {
            const error = await response.json()
            throw new error(error.error || 'failed to create')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('error creating daily', error)
        throw error
    }
}