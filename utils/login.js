const login = async (username, password) => {
    try {
        const res = await fetch('https://tt-backend-jxc4.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error || 'failed to login')
        }
        const data = await res.json()
        return data

    } catch (error) {
        console.error("unable to login due to ", error)
        throw error

    }

}
export default login
