import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const createRoom = async () => {
    const result = await axios.get(baseUrl+"/room/create")
    // console.log(result.data)
    return result.data
}

const getStatus = async (token) => {
    const result = await axios.get(baseUrl+"/room/status", {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Cache-Control': "no-cache"
        }
      })
    // console.log(result.data)
    return result
}

export default {
    createRoom,
    getStatus
}