

const addDailyTask = async (user_id, title, completed = false) => {
    try {
        const now = new Date()

        const formatted = new Date().toISOString().split('T')[0]

        const payload = {
            user_id,
            title,
            completed,
            date: formatted
        }

        console.log("SENDING:", payload)
        const response = await fetch('https://tt-backend-jxc4.onrender.com/create/daily_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
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

export default addDailyTask