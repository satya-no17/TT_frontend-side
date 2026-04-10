const register=async (username , hashpass ) =>{
    try {
        const response = await fetch('https://tt-backend-jxc4.onrender.com/register',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,hashpass
            })
        })
        if(!response.ok){
            const error = await response.json()
            throw new Error(error.error||'failed to create ')
        }
        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('unable to register', error)
        throw error
    }

}

export default register
