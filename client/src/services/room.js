import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const createRoom = async () => {
    const result = await axios.get(baseUrl+"/room/create")
    // console.log(result.data)
    return result.data
}

export default {
    createRoom
}