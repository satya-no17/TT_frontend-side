const register=async (username , hashpass ) =>{
    try {
        const response = await fetch('http://localhost:5000/register',{
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
            throw new error(error.error||'failed to create ')
        }
        const data = await response.json()
        return data
        
    } catch (error) {
        console.error('unable to register', error)
        throw error
    }

}

export default register